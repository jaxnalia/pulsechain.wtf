import { pb } from '$lib/pocketbase';
import type { Config } from '@sveltejs/kit';

// Use the Vercel Edge Runtime for this endpoint
export const config: Config = {
  runtime: 'edge',
};

export async function GET() {
    const stream = new ReadableStream({
        async start(controller) {
            // Subscribe to new messages
            const unsubscribe = await pb.collection('pulsechain_wtf_chat').subscribe('*', async ({ action, record }) => {
                if (action === 'create') {
                    try {
                        // When a new message is created, fetch it with the user expanded
                        const expandedRecord = await pb.collection('pulsechain_wtf_chat').getOne(record.id, {
                            expand: 'user',
                        });
                        // Send the new message to the client
                        controller.enqueue(`data: ${JSON.stringify(expandedRecord)}\n\n`);
                    } catch (e) {
                        console.error("SSE: Failed to process and send record.", e);
                    }
                }
            });

            // When the client disconnects, unsubscribe from the feed
            controller.closed.then(() => {
                unsubscribe();
            });
        },
        cancel() {
            // This is called if the client closes the connection
            pb.collection('pulsechain_wtf_chat').unsubscribe();
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
