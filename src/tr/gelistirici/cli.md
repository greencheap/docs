# CLI 

<p class="uk-article-lead"> GreenCheap, komut satırı arayüzü (CLI) aracılığıyla temel işlevlerinden bazılarını geliştiricilere sunar. Yararlı araçlar ve yardımcılar sunan bir dizi komut mevcuttur. </p>

## Temel kullanım

Bir terminal açın ve mevcut bir GreenCheap kurulumunun dizinine gidin. Bu dizindeki `greencheap` (dosya uzantısı yok) komut dosyası, komut satırından çalıştırılabilen bir PHP betiğidir.

```sh
cd /var/www/greencheap   # navigate to greencheap directory
./greencheap             # run greencheap CLI script
```

**Not** Bu betiği `chmod +x greencheap` kullanarak çalıştırılabilir yapmanız gerekebilir. Alternatif olarak, PHP yorumlayıcınızı açıkça `php greencheap` çağırabilirsiniz.

CLI aracını herhangi bir bağımsız değişken olmadan basitçe çağırırken, GreenCheap sürüm numarasını, bazı temel kullanım bilgilerini çıkaracak ve kullanabileceğiniz mevcut komutları listeleyecektir.

```txt
$ ./greencheap
greencheap version 1.0.3

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  archive              Archives an extension or theme
  build                Builds a .zip release file
  clearcache           Clears the system cache
  help                 Displays help for a command
  install              Installs a GreenCheap package
  list                 Lists commands
  migrate              Migrates GreenCheap
  self-update          Checks for newer GreenCheap versions and installs the latest
  setup                Setup a GreenCheap installation
  start                Starts the built-in web server
  uninstall            Uninstalls a GreenCheap package
  update               Updates dependencies of GreenCheap packages
 extension
  extension:translate  Generates extension's translation .pot/.po/.php files
 translation
  translation:fetch    Fetches current translation files from languages repository
```

Bir komutu çalıştırmak için, CLI aracını çağırırken bağımsız değişkenler ekleyebilirsiniz. Örneğin, pazardan Hello uzantısını yüklemek aşağıdaki gibi görünecektir.

```sh
./greencheap install greencheap/hello
```

## Kullanılabilir Komutlar

Mevcut komutlar, uzantı ve tema geliştiricileri için yardımcıların yanı sıra, GreenCheap projesinin bakımını GreenCheap geliştirici ekibi için daha kolay hale getiren araçları da içerir (`build` komutu gibi).

### Paket arşivi oluştur

Herhangi bir tema veya uzantıdan kurulabilir bir `*.zip` arşivi oluşturmak için bu komutu çalıştırın ve oluşturmak istediğiniz paketin yolunu belirtin. Aşağıdaki komut, GreenCheap kurulumunun üst klasöründe `greencheap-hello.zip` adlı bir dosya oluşturacaktır.

Örnek:

```sh
./greencheap archive greencheap/hello
```

Kullanım, argümanlar ve seçenekler:

```sh
Usage:
  archive [options] [--] <name>

Arguments:
  name                  Package name

Options:
      --dir[=DIR]       Write the archive to this directory
```

### GreenCheap sürüm arşivi oluşturun

Bu komut, GreenCheap bakımcıları tarafından bir GreenCheap sürüm paketi oluşturmak için kullanılır. GreenCheap kurulumunun kök klasöründe bir `*.zip` arşivi oluşturacaktır. Bu sürüm paketi daha sonra hem resmi GreenCheap web sitesinden indirebileceğiniz gibi bir paket olarak hem de teslim edebileceğiniz özel bir kurulum olarak kullanılabilir, örn. müşterilerinize.

Örnek:

```sh
./greencheap build
```

Kullanım (bağımsız değişken yok, seçenek yok):

```sh
Usage:
  build
```

### Önbelleği temizleyin

Önbelleği boşaltmak için `clearcache` komutunu kullanabilirsiniz. Bu komut, tüm `*.cache` dosyalarını, normal bir GreenCheap kurulumunda `tmp/cache` de bulunan önbellek dizininden kaldırır.

Örnek:

```sh
./greencheap clearcache
```

Kullanım (bağımsız değişken yok, seçenek yok):

```sh
Usage:
  clearcache
```

### Herhangi bir CLI komutu için kullanım bilgilerini görüntüleyin

Bir CLI komutunun gerçekte ne yaptığını ve nasıl kullanıldığını öğrenmek için, `help` komutunu kullanabilirsiniz.

Örnek:

```sh
./greencheap help install
```

Kullanım ve argümanlar:

```
Usage:
  help [options] [--] [<command_name>]

Arguments:
  command               The command to execute
  command_name          The command name [default: "help"]

Options:
      --format=FORMAT   The output format (txt, xml, json, or md) [default: "txt"]
```

### Kullanılabilir komutları listeleyin

Mevcut tüm CLI komutlarını `list` komutuyla kist edebilirsiniz. Bu, CLI betiğini herhangi bir parametre olmadan çalıştırmakla aynı çıktıyı oluşturur.

Örnek:

```sh
./greencheap list
```

Kullanım, argümanlar ve seçenekler:

```sh
Usage:
  list [options] [--] [<namespace>]

Arguments:
  namespace            The namespace name

Options:
      --raw            To output raw command list
      --format=FORMAT  The output format (txt, xml, json, or md) [default: "txt"]
```

### GreenCheap geçişlerini çalıştırın

Yeni bir GreenCheap sürümü yüklendikten sonra, sistemin bazen veritabanı yapısında değişiklikler yapması gerekir. Bu değişiklikler, _migration adı altında gruplandırılmıştır. Çalıştırılması gerekebilecek herhangi bir taşıma işlemini çalıştırmak için, `migrate` komutunu kullanabilirsiniz. Genel olarak, bunu açıkça yapmanıza gerek yoktur. Yönetici alanına giriş yaptığınızda, GreenCheap ayrıca herhangi bir taşıma olup olmadığını kontrol edecek ve gerekirse bunları çalıştıracaktır.

Örnek:

```sh
./greencheap migrate
```

Kullanım (bağımsız değişken veya seçenek yok):

```sh
Usage:
  migrate
```

### GreenCheap kurulumunu yükseltme

GreenCheap kurulumunuzu terminalden yükseltin. İsteğe bağlı olarak, yükseltmeyi çalıştırmak için kullanılması gereken yeni GreenCheap paketine bir bağlantı sağlayabilirsiniz. Bu durumda, indirilen dosyayı doğrulamak için kullanılan geçerli bir SHA hash'i de sağlamanız gerekir. URL ve karma sağlamazsanız, komut greencheap.net'deki en yeni GreenCheap paketini kullanacaktır.

Örnek:

```sh
./greencheap self-update
```

Kullanım ve seçenekler:

```sh
Usage:
  self-update [options]

Options:
  -u, --url=URL
  -s, --shasum=SHASUM
```

### Tam bir GreenCheap kurulumu kurun

Tarayıcıyı açmadan kurulumu çalıştırmak için yeni indirilmiş bir GreenCheap kurulum paketinden bir terminal komutu çalıştırabilirsiniz. Bu, kendiniz veya istemci projeleri için otomatik yüklemeler için kullanılabilir.

GreenCheap'i SQLite ve varsayılan yönetici kullanıcı kullanarak kurma örneği:

```sh
./greencheap setup --password=<SOMETHING-SECURE>
```

Kullanım ve seçenekler:

```sh
Usage:
  setup [options]

Options:
  -u, --username=USERNAME      Admin username [default: "admin"]
  -p, --password=PASSWORD      Admin account password
  -t, --title[=TITLE]          Site title [default: "GreenCheap"]
  -m, --mail[=MAIL]            Admin account email [default: "admin@example.com"]
  -d, --db-driver=DB-DRIVER    DB driver ('sqlite' or 'mysql') [default: "sqlite"]
      --db-prefix[=DB-PREFIX]  DB prefix [default: "pk_"]
  -H, --db-host[=DB-HOST]      MySQL host
  -N, --db-name[=DB-NAME]      MySQL database name
  -U, --db-user[=DB-USER]      MySQL user
  -P, --db-pass[=DB-PASS]      MySQL password
  -l, --locale[=LOCALE]        Locale
```

### Yerleşik web sunucusunu başlatın

Aslında tam bir Apache sunucusu kurulumuna ihtiyacınız yoktur. Bunun yerine yerel makinenizde çalışan bağımsız bir sunucu örneği için `start` komutunu çalıştırabilirsiniz. Komut, siz sunucu örneğinden çıkmak için CTRL + C'ye basana kadar çalışmaya devam edecektir.

```sh
./greencheap start --server=127.0.0.1:8080
```

Kullanım ve seçenekler:

```
Usage:
  start [options]

Options:
  -s, --server[=SERVER]  Server name and port [default: "127.0.0.1:8080"]
```

### Paketteki çeviri dizelerini ayrıştırın

Bir tema veya uzantı oluştururken, kullanıcı arayüzünün birden çok dilde görüntülenebildiğinden emin olmak için GreenCheap'in uluslararasılaştırma sistemini kullanabilirsiniz ve kullanmalısınız. Temel olarak, bu, dizeleri özel işlev çağrılarına (ör. PHP şablonlarında `__('Translate me!')` Veya Vue şablonlarında `{{ 'Translate me!' |trans }}` e sararak çalışır. `extension:translate` komutlar, belirli bir tema veya uzantıdaki bu tür işlev çağrılarının tüm oluşumlarını bulacak ve sizin için tüm çevrilebilir dizeleri toplayacak ve bunları belirtilen paketin `languages/` alt dizinine yazacaktır.Bu dosyalar daha sonra paketiniz için çeviriler oluşturmak için kullanılabilir , örneğin [Transifex](https://www.transifex.com/greencheap/greencheap-cms/) gibi bir hizmet kullanarak.

Misal:

```sh
./greencheap extension:translate greencheap/blog
```

Kullanım ve argümanlar:

```sh
Usage:
  extension:translate [<extension>]

Arguments:
  extension             Extension name
```

### Yeni çeviri dosyalarını getir

**Kullanımdan Kaldırılmış Uyarı** Bu komut değiştirilecektir.

Bu komut, GreenCheap'in çekirdek bakımcıları tarafından, çevirileri GreenCheap çeviri havuzundan almak için kullanılır. Çeviri iş akışı ve dosya yapısı şu anda tartışılmaktadır ve bu komut muhtemelen GreenCheap'in gelecekteki bir sürümünde değiştirilecektir.

Örnek:

```sh
./greencheap translation:fetch
```

Kullanımı:

```sh
Usage:
  translation:fetch
```
