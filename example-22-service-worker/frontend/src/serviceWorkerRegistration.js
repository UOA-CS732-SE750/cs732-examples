const SW_URL = `${process.env.PUBLIC_URL}/service-worker.js`;

/**
 * Registers the servie worker for this site.
 */
export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(SW_URL);
        });
    }
    else if (process.env.NODE_ENV !== 'production') {
        console.log('Not running in production - service worker will not be registered.');
    }
}

/**
 * Unregisters the service worker for his site.
 */
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}