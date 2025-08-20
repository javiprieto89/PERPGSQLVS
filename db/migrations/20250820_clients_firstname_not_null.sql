-- db/migrations/20250820_clients_firstname_not_null.sql
-- Ajusta FirstName como NOT NULL en tabla Clients
UPDATE Clients SET FirstName = '' WHERE FirstName IS NULL;
ALTER TABLE Clients ALTER COLUMN FirstName NVARCHAR(100) COLLATE Modern_Spanish_CI_AS NOT NULL;
