export const getWebsocketBase = async (websocketHostname: string) => {
    try {
        const res = await fetch('/api/backend');
        if (res.ok) {
            const json = await res.json();
            const backendUri = 'ws://' + websocketHostname + ":" + json.backend_port 
            console.debug("Backend URI:", backendUri);
            return backendUri
        }
    } catch (error) {
        console.error("Error fetching config", error);
    }
};