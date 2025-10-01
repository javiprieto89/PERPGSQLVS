----------------------------------------------------------------------
-- LUBRICENTRODB2 – Mantenimiento de índices + estadísticas
-- 1) Crea el procedimiento dbo.usp_Mant_Liviano
-- 2) Crea el Job "LCDB2 – Mantenimiento liviano índices/estadísticas"
--    que lo ejecuta todos los días 02:30
----------------------------------------------------------------------

/*===========================
= 1) PROCEDIMIENTO (DB)     =
===========================*/
USE LubricentroDB2;
GO

IF OBJECT_ID('dbo.usp_Mant_Liviano','P') IS NOT NULL
    DROP PROCEDURE dbo.usp_Mant_Liviano;
GO

CREATE PROCEDURE dbo.usp_Mant_Liviano
    @rebuild_threshold  tinyint = 30,  -- >30% => REBUILD
    @reorg_threshold    tinyint = 5,   -- 5-30% => REORGANIZE
    @fillfactor         tinyint = 90,  -- REBUILD con FF
    @min_pages          int     = 100, -- ignora índices chicos
    @maxdop             tinyint = 0    -- 0=por defecto del servidor
AS
BEGIN
    SET NOCOUNT ON;
    SET DEADLOCK_PRIORITY LOW;

    -- 1) Fragmentación actual
    IF OBJECT_ID('tempdb..#frag') IS NOT NULL DROP TABLE #frag;

    SELECT 
        s.name  AS schema_name,
        o.name  AS table_name,
        i.name  AS index_name,
        i.index_id,
        ps.avg_fragmentation_in_percent AS frag_pct,
        ps.page_count
    INTO #frag
    FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ps
    JOIN sys.indexes  i ON i.object_id = ps.object_id AND i.index_id = ps.index_id
    JOIN sys.objects  o ON o.object_id = ps.object_id AND o.type = 'U'
    JOIN sys.schemas  s ON s.schema_id = o.schema_id
    WHERE ps.page_count >= @min_pages
      AND i.type IN (1,2); -- 1=CL, 2=NCL

    -- 2) Comandos de mantenimiento
    DECLARE @sql nvarchar(max) = N'';

    ;WITH acc AS (
        SELECT 
            schema_name, table_name, index_name, index_id, frag_pct,
            cmd = CASE 
                WHEN frag_pct >= @rebuild_threshold THEN
                    CONCAT(N'ALTER INDEX ', QUOTENAME(index_name),
                           N' ON ', QUOTENAME(schema_name), N'.', QUOTENAME(table_name),
                           N' REBUILD WITH (FILLFACTOR = ', @fillfactor,
                           CASE WHEN @maxdop>0 THEN CONCAT(N', MAXDOP = ', @maxdop) ELSE N'' END,
                           N');')
                WHEN frag_pct >= @reorg_threshold THEN
                    CONCAT(N'ALTER INDEX ', QUOTENAME(index_name),
                           N' ON ', QUOTENAME(schema_name), N'.', QUOTENAME(table_name),
                           N' REORGANIZE;')
                ELSE N''
            END
        FROM #frag
    )
    SELECT @sql = STRING_AGG(cmd, CHAR(10))
    FROM acc
    WHERE cmd <> N'';

    PRINT N'-- Mantenimiento de índices';
    IF @sql IS NOT NULL AND LEN(@sql) > 0
        EXEC sp_executesql @sql;
    ELSE
        PRINT N'No hay índices para mantener (fragmentación baja o índices chicos).';

    -- 3) Actualizar estadísticas (rápido)
    PRINT N'-- Actualizar estadísticas (WITH RESAMPLE)';
    DECLARE @sqlStats nvarchar(max) = N'';
    ;WITH stats_t AS (
        SELECT s.name AS schema_name, o.name AS table_name
        FROM sys.objects o 
        JOIN sys.schemas s ON s.schema_id=o.schema_id
        WHERE o.type='U'
    )
    SELECT @sqlStats = STRING_AGG(
        N'UPDATE STATISTICS ' + QUOTENAME(schema_name)+N'.'+QUOTENAME(table_name) + N' WITH RESAMPLE;', 
        CHAR(10))
    FROM stats_t;

    IF @sqlStats IS NOT NULL AND LEN(@sqlStats)>0
        EXEC sp_executesql @sqlStats;

    -- 4) (Opcional pesado) Descomentá si querés fullscan semanal
    -- UPDATE STATISTICS dbo.CommercialDocuments WITH FULLSCAN;
    -- UPDATE STATISTICS dbo.Orders               WITH FULLSCAN;
    -- UPDATE STATISTICS dbo.Transactions         WITH FULLSCAN;

    PRINT N'Listo. Mantenimiento completado.';
END
GO


/*=========================================
= 2) JOB DE SQL AGENT (MSDB, 02:30 diario) =
=========================================*/
USE msdb;
GO

-- Si existe, lo borro para recrearlo limpio
IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'LCDB2 – Mantenimiento liviano índices/estadísticas')
BEGIN
    EXEC msdb.dbo.sp_delete_job @job_name = N'LCDB2 – Mantenimiento liviano índices/estadísticas';
END
GO

DECLARE @job_id UNIQUEIDENTIFIER;
EXEC msdb.dbo.sp_add_job
  @job_name        = N'LCDB2 – Mantenimiento liviano índices/estadísticas',
  @enabled         = 1,
  @description     = N'Reorganiza/reconstruye índices según fragmentación y actualiza estadísticas en LubricentroDB2',
  @start_step_id   = 1,
  @notify_level_eventlog = 0,
  @job_id          = @job_id OUTPUT;

EXEC msdb.dbo.sp_add_jobstep
  @job_id      = @job_id,
  @step_id     = 1,
  @step_name   = N'Ejecutar mantenimiento',
  @subsystem   = N'TSQL',
  @database_name = N'LubricentroDB2',
  @command     = N'EXEC dbo.usp_Mant_Liviano @rebuild_threshold=30, @reorg_threshold=5, @fillfactor=90, @min_pages=100, @maxdop=0;',
  @retry_attempts = 1,
  @retry_interval = 5;

-- Agenda diaria 02:30
EXEC msdb.dbo.sp_add_schedule
  @schedule_name     = N'Diario_02_30',
  @freq_type         = 4,       -- diario
  @freq_interval     = 1,
  @active_start_time = 023000;  -- 02:30

EXEC msdb.dbo.sp_attach_schedule
  @job_name      = N'LCDB2 – Mantenimiento liviano índices/estadísticas',
  @schedule_name = N'Diario_02_30';

EXEC msdb.dbo.sp_add_jobserver
  @job_name    = N'LCDB2 – Mantenimiento liviano índices/estadísticas',
  @server_name = N'(local)';   -- cambiá si corresponde

PRINT 'Job creado y agendado.';
GO
