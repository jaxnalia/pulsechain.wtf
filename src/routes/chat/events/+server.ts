import { pb } from '$lib/pocketbase';
import { json } from '@sveltejs/kit';

export async function GET() {
    const stream = new ReadableStream({
        async start(controller) {
            // Subscribe to new messages
            const unsubscribe = await pb.collection('pulsechain_wtf_chat').subscribe('*', async ({ action, record }) => {
                if (action === 'create') {
                    // When a new message is created, fetch it with the user expanded
                    const expandedRecord = await pb.collection('pulsechain_wtf_chat').getOne(record.id, {
                        expand: 'user',
                    });
                    // Send the new message to the client
                    controller.enqueue(`data: ${JSON.stringify(expandedRecord)}

`);
                }
            });

            // When the client disconnects, unsubscribe from the feed
            controller.closed.then(() => {
                unsubscribe();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
