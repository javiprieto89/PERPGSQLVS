# Permite importar 'app' como paquete raíz para pytest y otros runners
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + '/../'))
