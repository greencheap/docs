A popular concept for communication in Modern web application are events. An event is triggered at a specific stage of code execution. All other codes, including your extensions, can sign up for one or more activities and take action at a specific time.

An event always identifier, a unique string (`Boot` for event triggered at boot stage of GreenCheap application) are defined with.

You will learn about the current events you can listen to in this document and how you can record an event listener in Greencheap.

## System events

GreenCheap, provides a range of activities throughout the life cycle of the page request:


- `boot`: The boot stage of the Yesil cheap app has begun.
- `request`: Request processing phase of kernel started.
- `controller`: A controller action to be called.
- `response`: Response to be sent to the browser.
- `terminate`: Reply to Green Cheap application successfully submitted.
- `exception`: An exception has occurred.


## Auth-Events

All authorization activities are defined in `GreenCheap/Auth/authorizations`.

## Database / EntityManager

A specific event is triggered for each entity that is loaded, updated, or created. For example, a `model.widget.init` event is triggered if a widget is loaded.

The schema for entity event names is "model.entity_short_name.event_name". This generic event system allows you to listen to single entities.

You can find a list of all EntityManager events in `GreenCheap\Database\Events`.

## Router

The router triggers an event before and after a route is executed. Each event name contains the executed URL: `before@site/api/node/save` or `after@system/settings/save`

## Sign up for EventListener

Let's record a listener called when a page is saved.

You must register the listener in your `index.php` package:

```
return [
    // your package description

    'events' => [

        'boot' => function ($event, $app) {
            $app->subscribe(new \Acme\Listener\PostSaveListener());
        }
    ]
];
```

And listener code:

```
<?php

namespace Acme\Listener;

use GreenCheap\Event\Event;
use GreenCheap\Event\EventSubscriberInterface;

class PostSaveListener implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'model.page.saved' => 'onSaved',
        ];
    }

    /**
     * @param Event $event
     * @param object $model The saved entity
     */
    public function onSaved(Event $event, $model)
    {
        // your code
    }
}
```