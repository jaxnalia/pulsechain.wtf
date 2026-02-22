import { pb } from '$lib/pocketbase';
import type { Config } from '@sveltejs/kit';

// Use the Vercel Edge Runtime for this endpoint
export const config: Config = {
  runtime: 'edge',
};

export async function GET() {
    let intervalId: any;

    const stream = new ReadableStream({
        start(controller) {
            let lastChecked = new Date().toISOString();

            intervalId = setInterval(async () => {
                try {
                    const resultList = await pb.collection('pulsechain_wtf_chat').getList(1, 50, {
                        filter: `created > "${lastChecked}"`,
                        sort: 'created',
                        expand: 'user',
                    });

                    if (resultList.items.length > 0) {
                        for (const item of resultList.items) {
                            controller.enqueue(`data: ${JSON.stringify(item)}\n\n`);
                        }
                        // Update lastChecked to the timestamp of the newest record sent
                        lastChecked = resultList.items[resultList.items.length - 1].created;
                    }
                } catch (e) {
                    // Don't log error if it's a connection closure, but handle other potential errors
                    console.error("SSE Polling Error:", e);
                }
            }, 2000); // Poll every 2 seconds
        },
        cancel() {
            // This is called if the client closes the connection
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
