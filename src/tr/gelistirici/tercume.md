# Tercüme

<p class="uk-article-lead"> GreenCheap, mesajları farklı dillerde görüntüleme yeteneklerine sahiptir. Bu, arayüzün herhangi bir sayıda dil için yerelleştirilmesine olanak tanır. </p>

**Not** Belirli bir bölgede konuşulan belirli bir dilin farklı sürümleri olabileceğinden diller ve yerel ayarlar arasında bir fark vardır (örneğin, `en_GB` ve `en_US`).


## Dil dosyaları

GreenCheap'in çekirdeği, sağlanan dil dosyalarıyla birlikte gelir.

```
/app/system/languages

  /en_US
    messages.php
    formats.json
    languages.json
    territories.json

  /tr_TR
    messages.php
    formats.json
    languages.json
    territories.json

  messages.pot
```

Yol                      | Açıklama
------------------------ | -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------
`messages.pot` | Bu, tüm çevrilebilir dizeleri içeren ana dosyadır. Yerelleştirilmiş sürümler oluşturmak için temel olarak kullanılır. GreenCheap bakımcıları tarafından düzenli olarak Transifex'e yüklenir.
`/en_US` <br> `/tr_TR` | Her klasör bir yerel ayara karşılık gelir
`xx_XX/formats.json` | Yerelleştirilmiş Biçim dizeleri
`xx_XX/languages.json` | Yerelleştirilmiş dil adları
`xx_XX/territories.json` | Yerelleştirilmiş bölge adları

Biçimler, diller ve bölgeler [Unicode Common Locale Data Repository](http://cldr.unicode.org/) tarafından tanımlanır.

Çeviri, dizenin İngilizce sürümünden yerelleştirilmiş bir sürüme (`tr_TR/messages.php`) basit bir eşlemedir.

```php
"No database connection." => "Veritabanına Bağlantı Yapılamadı"
```

## Kullanım

Bir dizenin yerelleştirilmiş versiyonunu elde etmek için, bir PHP dosyası içinde global `__(...)` işlevini kullanabilirsiniz. Bir Vue şablonunda, bir dizedeki trans filtresini kullanın.

GreenCheap, etkin yerel ayarı otomatik olarak kontrol edecek ve mevcut dizenin yerelleştirilmiş bir sürümünü döndürecektir.

PHP dosyalarında:

```php
echo __('Save');
```

Vue şablonlarında:

```vue
{{ 'Save' | trans }}
```

### Değişkenler

`$name` de kayıtlı bir adınız olduğunu ve bunu yerelleştirilmiş bir dizeye dahil etmek istediğinizi varsayalım. Basit dize değişimi yapmak için çevirme işlevlerine parametreler iletebilirsiniz.

```php
$message = __("Hello %name%!", ["%name%" => $name]);
```

Vue şablonlarında parametreleri `trans` filtresine geçirebilirsiniz.

```vue
{{ 'Installing %title%' | trans {title:pkg.title} }}
```

### Çoğullaştırma

Bir numaraya bağlı olarak birkaç mesaj arasından seçim yapmak için, alternatifleri belirleyen bir sözdizimi kullanabilir ve belirli sayıları ve hatta aralıkları belirleyebilirsiniz. Değiştirme parametrelerini de destekleyen `_c(...)` işlevini kullanın.

```php
$message = _c('{0} No Item enabled.|{1} Item enabled.|]1,Inf[ Items enabled.', count($ids))
```

Vue şablonlarında `transChoice` filtresini kullanabilirsiniz.

```vue
{{ '{0} %count% Files|{1} %count% File|]1,Inf[ %count% Files' | transChoice count {count:count} }}
```

Eşleşen sayıyı belirtmek için, süslü parantezler içindeki sayıyı `{0}`, daha okunabilir hale getirmek için etiketler kullanabilirsiniz. Bu varyantlar da karıştırılabilir.

Bir aralık, sonlu bir sayı kümesini temsil edebilir: `{1,2,3,4}` ve iki sayı arasındaki sayıları temsil edebilir: `[1, +Inf]`, `]-1,2[`. Sol sınırlayıcı `[` (dahil) veya `]` (hariç) olabilir. Sağ sınırlayıcı `[` (hariç) veya `]` (dahil) olabilir. Sayıların yanı sıra sonsuz için `-Inf` ve `+Inf` kullanabilirsiniz.

## Uzantınız için dil dosyaları oluşturun
To translate your own extension, use the command line tool which will extract all translatable strings.
Kendi uzantınızı çevirmek için, tüm çevrilebilir dizeleri çıkaracak komut satırı aracını kullanın.

```bash
./greencheap extension:translate greencheap/extension-hello
```

Bu, bulunan tüm dizeler dahil `/packages/greencheap/extensions-hello/languages/messages.pot` oluşturacaktır. Bunlar, Vue bileşenlerindeki `__()`, `_c()` veya `trans` ve `transchoice` filtrelerinden birine yapılan tüm çağrıları bularak toplanmıştır.

Ancak, iletileri dinamik olarak belirlediğinizde dizelerin otomatik olarak algılanması _başarısız_ olacaktır. Komutun başarısız olacağı örnekler şunlardır:

```php
<?php

// string cannot be detected: no string literal used
echo __($message);

// string cannot be detected: Use format string instead
echo __('Hello' + $name);
```

```vue
// string literal without using translation filter
UIkit.notify('Item deleted');
```

Bazen, çalışma sırasında dinamik olarak bir dizeyi belirlemeniz gerektiğinden bu durumlardan kaçınamazsınız. Bu sorun için önerilen çözüm, uzantınızın içinde, çeviri komutuyla bulunabilecek tüm dizeleri içeren bir `languages/messages.php` dosyası bulmaktır.

```php
<?php

__('Message One');
__('Message Two');
_c('{0} %count% Files|one: File|more %count% File', 0);
```

The finished translation files have to be located in the `languages` folder of your extension, i.e. in `languages/tr_TR/`.
Oluşturulan `messages.pot` ile artık uzantınız için çeviriler oluşturabilirsiniz. Çevirileri manuel olarak [poEdit](http://www.poedit.net/) gibi bir araçla oluşturabilir veya ayrıca Transifex'ten yararlanabilirsiniz.

Bitmiş çeviri dosyaları, uzantınızın `languages` klasöründe, yani `languages/tr_TR/` olarak bulunmalıdır.

## Yerel ayar nasıl belirlenir

Yükleyici çalıştırıldığında, yerel ayar manuel olarak seçilir. Bu daha sonra GreenCheap yönetici panelinde (_System / Localization_) değiştirilebilir. Ön uç ve yönetici paneli için farklı bir yerel ayar belirleyebilirsiniz.

**Not** Yalnızca sistem uzantısı için kullanılabilen dilleri seçebilirsiniz.

## Mesaj alan adlarıyla çalışma

`__(...)` / `_c(...)` işlevleri ve `trans` / `transChoice` filtreleri, bir _ alan adı ayarlamak için üçüncü bir parametreye sahiptir. Varsayılan alan adı `messages` dır, bu nedenle şu ana kadar `messages.*` dosyalarıyla uğraşıyoruz. Tüm uzantılar dizelerini bu etki alanında paylaşır. Bu nedenle, sistem uzantısı tarafından çevrilen dizeler, tekrar çevirmeye gerek kalmadan hemen kullanılabilir. Bu, _Kaydet_, _Hata_ veya _Ay_ adı gibi genel terimleri içerir.

Aslında, daha önce `./greencheap extension:translate hello` çağrısı yaptığımızda, ortaya çıkan `messages.pot`, Hello uzantısında bulunsalar bile, sistem mesajlarının hiçbirini içermiyordu.

Varsayılan etki alanından mesaj paylaşmak istemediğiniz bir durum olabilir. Kendi etki alanınızı ayarlayın ve `*.pot` dosyalarını yeniden oluşturun. Yerelleştirmenizi sistemden tamamen ayrı tutmak için bunu tek tek dizeler için yapabilir veya tüm dizelerde parametreyi ayarlayabilirsiniz.

```php
$msg = __("Hello Universe", [], "hello");
```
