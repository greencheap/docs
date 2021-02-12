# Yorum Servisi

```PHP
	<?= $view->render('system/comment:views/comment.php', [
        'service' => [
            'type' => 'blog',
            'own_id' => $post->id,
            'type_url' => [
                'url' => '@blog/id',
                'key' => 'id',
            ]
        ]
    ]) ?>
```