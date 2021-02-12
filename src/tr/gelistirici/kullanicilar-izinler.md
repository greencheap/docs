# Kullanıcılar & İzinler

<p class="uk-article-lead">GreenCheap, hazır bir kayıt prosedürü ve güçlü bir kullanıcı yöneticisi ile birlikte gelir. Sisteminizdeki tüm bu kullanıcılar sayesinde, uzantınız rolleri ve izinleri kolayca kullanabilir.</p>

## Concepts

**Kullanıcı**, sitenize kayıtlı ve kullanıcı adıyla tanımlanan bir kişinin temsilidir. Bir kullanıcı hesabının durumu *etkin*, *engellenmiş* veya *yeni* olabilir. Kullanıcılar sitenize veya yönetici alanına giriş yapabilir. Tüm kullanıcıların hesaplarının yönetici alanına erişmesine izin verilmez.

**İzinler** bir kullanıcının gerçekleştirebileceği eylemleri tanımlar. İzin bir adla tanımlanır, örneğin `user: access admin area`. İzin adları açıklayıcı olmalı ve ilgili modülün adıyla başlamalıdır, ör. `user:` kullanıcı modülü için.

**Roller** birkaç kullanıcı hesabını gruplandırır. Aynı role sahip tüm kullanıcılar aynı izinleri paylaşır. Roller, sitenizin içeriğinin öğelerine erişimi yönetmek için de kullanılır. Bir kullanıcı sıfır, bir veya birden fazla role ait olabilir. Bir rolün kendisine atanmış çok sayıda kullanıcı olabilir. GreenCheap varsayılan rolleri **Anonymous**, **Authenticated** ve **Administrator** ile birlikte gelir ve ihtiyacınız olduğu kadar çok şey oluşturmanıza olanak tanır.

## İçeriği yalnızca belirli bir role göster

Roller nasıl kullanılabilecekleri konusunda çok esnektir. Yalnızca seçili kullanıcılar tarafından erişilebilen belirli bir içerik oluşturabilirsiniz.

1. *Users > Roles* içinde **Premium** adlı yeni bir rol oluşturun. Bu role hiçbir izin atamayın.
2. *Users > List*'de, profillerini düzenlemek ve bu kullanıcı için yeni **Premium** rolünü etkinleştirmek için bir kullanıcı hesabını tıklayın.
3. *Site* alanındaki her sayfada, kenar çubuğunda *Erişimi kısıtla* bölümünü görebilirsiniz. **Premium** rolünü seçtiğinizden ve başka bir şey seçmediğinizden emin olun.

Bu öğe artık yalnızca **Premium** rolüne giriş yapmış kullanıcılar tarafından görülebilir.

**Not** Kullanıcıyı **Premium** rolüne eklemediğiniz veya *Erişimi kısıtla* ayarlarında **Yönetici** seçeneğini etkinleştirmediğiniz sürece yönetici hesabınız da bu içeriği göremez.

## Bir modül tanımından izinleri kaydetme

Sistem alanına daha sonra bir rol atanabilecek bir izin eklemek için, bir uzantının `index.php` dosyasındaki `permissions` anahtar sözcüğünü kullanın.

Konuşma izni adlarını kullanın. Kural, uzantının adıyla başlamak ve ardından izni açıklayan kısa bir ifadeye sahip olmaktır. `Title`, tarayıcıda görüntülenen dizedir. `_()` Çağrısı bu dizenin çevrilebilir olmasını sağlar.

```php
'permissions' => [
    'hello: manage settings' => [
        'title' => _('Manage settings')
    ],
],
```

Kullanıcının belirli bir kimlik rolü olup olmadığını kontrol edin.

```php
$role_id = 4;
App::user()->hasRole($role_id);
```

Kullanıcının belirtilen adda bir rolü olup olmadığını kontrol edin.

```php
$role_name = "Editor";
$role = Role::where('name = ?', [$role_name])->first();
App::user()->hasRole($role->id);
```
