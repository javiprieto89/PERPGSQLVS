#!/usr/bin/env python3
"""
Development startup script for Windows

This script sets up the appropriate event loop and starts the development server.
It automatically detects the platform and uses the correct event loop implementation.
"""

import os
import sys
import logging
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """Main startup function for development on Windows"""
    
    # Load environment variables from root .env file
    load_dotenv('.env')
    
    # Import event loop utilities
    try:
        from app.utils.event_loop import setup_event_loop, setup_uvicorn_loop_config
        
        # Setup the appropriate event loop
        loop_name = setup_event_loop()
        logger.info(f"Event loop configured: {loop_name}")
        
        # Get uvicorn configuration for the current platform
        uvicorn_config = setup_uvicorn_loop_config()
        
    except ImportError as e:
        logger.warning(f"Could not import event loop utilities: {e}")
        logger.info("Using default configuration")
        uvicorn_config = {"loop": "asyncio"}
    
    # Start the development server
    try:
        import uvicorn
        
        # Development configuration
        config = {
            "app": "app.main:app",
            "host": "127.0.0.1",
            "port": 8000,
            "reload": True,
            "log_level": "info",
            **uvicorn_config  # Include platform-specific loop configuration
        }
        
        logger.info("Starting development server...")
        logger.info(f"Server will be available at: http://{config['host']}:{config['port']}")
        logger.info(f"GraphQL endpoint: http://{config['host']}:{config['port']}/graphql/")
        
        # Start uvicorn
        uvicorn.run(**config)
        
    except ImportError:
        logger.error("uvicorn is not installed. Please install it with: pip install uvicorn")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
