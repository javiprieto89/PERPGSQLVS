"""
Event Loop Utility for Cross-Platform Compatibility

This module handles the automatic selection of the appropriate event loop
based on the operating system:
- uvloop for Unix/Linux systems (better performance)
- winloop for Windows systems  
- fallback to default asyncio event loop if neither is available
"""

import sys
import logging
import asyncio

logger = logging.getLogger(__name__)


def setup_event_loop():
    """
    Sets up the most appropriate event loop for the current platform.
    
    Returns:
        str: The name of the event loop being used
    """
    try:
        if sys.platform == "win32":
            # Windows - try to use winloop
            try:
                import winloop
                winloop.install()
                logger.info("Using winloop event loop for Windows")
                return "winloop"
            except ImportError:
                logger.warning("winloop not available, using default asyncio event loop")
                return "asyncio"
        else:
            # Unix/Linux - try to use uvloop
            try:
                import uvloop
                uvloop.install()
                logger.info("Using uvloop event loop for Unix/Linux")
                return "uvloop"
            except ImportError:
                logger.warning("uvloop not available, using default asyncio event loop")
                return "asyncio"
    except Exception as e:
        logger.error(f"Error setting up event loop: {e}")
        logger.info("Falling back to default asyncio event loop")
        return "asyncio"


def get_recommended_loop_policy():
    """
    Returns the recommended event loop policy for the current platform.
    
    Returns:
        asyncio.AbstractEventLoopPolicy or None: The recommended policy
    """
    try:
        if sys.platform == "win32":
            try:
                import winloop
                return winloop.EventLoopPolicy()
            except ImportError:
                return None
        else:
            try:
                import uvloop
                return uvloop.EventLoopPolicy()
            except ImportError:
                return None
    except Exception:
        return None


def setup_uvicorn_loop_config():
    """
    Returns configuration for uvicorn with the appropriate event loop.
    
    Returns:
        dict: Configuration dictionary for uvicorn
    """
    config = {}
    
    if sys.platform == "win32":
        # Windows
        try:
            import winloop
            config["loop"] = "winloop"
            logger.info("Configuring uvicorn with winloop for Windows")
        except ImportError:
            config["loop"] = "asyncio"
            logger.info("Configuring uvicorn with asyncio (winloop not available)")
    else:
        # Unix/Linux
        try:
            import uvloop
            config["loop"] = "uvloop"
            logger.info("Configuring uvicorn with uvloop for Unix/Linux")
        except ImportError:
            config["loop"] = "asyncio"
            logger.info("Configuring uvicorn with asyncio (uvloop not available)")
    
    return config


# Initialize the event loop when the module is imported
if __name__ != "__main__":
    # Only setup when imported, not when run directly
    setup_event_loop()
