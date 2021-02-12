# User Permissions
<p class="uk-article-lead">Green Cheap, comes with a ready-made registration procedure and a powerful user manager. With all these users on your system, your extension can easily use roles and permissions.</p>

## Concepts

**Users** a representation of a person registered to your site and identified by their username. Status of a user account *enabled*, it can be *blocked* or *new* . Users can log in to your site or admin area. Not all users are allowed access to the administrator area of their accounts.

**Permissions** defines actions that a user can perform. Permission is defined by a name, for example `user: access admin area`. Permission names must be descriptive and begin with the name of the corresponding module, etc. `user:` for user module.

**Roles** groups several user accounts. All users with the same role share the same permissions. Roles are also used to manage access to elements of your site's content. A user can belong to zero, one, or more roles. A role can have many users assigned to it. Green Cheap comes with default roles **anonymous**, **authenticated** and **administrator** and lets you create as much as you need.

## Show content only to a specific role

Roles are very flexible about how they can be used. You can create specific content that can only be accessed by selected users.

1. Create a new role named **Premium** in *Users > Roles*. Assign permissions to this role.
2. In *Users > List*, click a user account to edit their profile and activate the new **Premium** role for that user.
3. On each page in the *Site* field, you can see the *Restrict Access* section in the sidebar. Be sure to choose the **Premium** role and choose nothing else.

This item is now visible only to users who have signed in to the **Premium** role.

**Note** Kullanıcıyı **Premium** rolüne eklemediğiniz veya *Erişimi kısıtla* ayarlarında **Yönetici** seçeneğini etkinleştirmediğiniz sürece yönetici hesabınız da bu içeriği göremez.

## Save permissions from a module definition

To add a permission to the system field that can then be assigned a role, use the keyword `permissions` in the in `php.file` for an extension.

Use speech permission names. The rule is to start with the name of the extension and then have a short statement describing the permission. `Title` is the string displayed in the browser. `_()` Its call makes this string translatable.

```php
'permissions' => [
    'hello: manage settings' => [
        'title' => _('Manage settings')
    ],
],
```

Check whether the user has a specific identity role.

```php
$role_id = 4;
App::user()->hasRole($role_id);
```

Check if the user has a role with the specified name.

```php
$role_name = "Editor";
$role = Role::where('name = ?', [$role_name])->first();
App::user()->hasRole($role->id);
```