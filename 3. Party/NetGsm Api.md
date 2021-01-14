NetGsm API is an open source library created using the API documentation of <a href="https://www.netgsm.com.tr" target="_blank" ref="nofollow">NetGsm</a> firm. With this library developed with PHP, you can send Sms, voice Sms etc. to your users. You can do the operations. 

To use this application you must already have a NetGsm account and that api operations must be accessible.  You can contact <a href="https://www.netgsm.com.tr" target="_blank" ref="nofollow">NetGsm</a>  for further information.

### System Requirements

Ensure that your server meets the following requirements.

[SimpleXML](http://php.net/manual/book.simplexml.php), [cURL](http://php.net/manual/book.curl.php)

### Setup

It is very simple to use and you will be ready to use it with just a few operations. To use this library [Composer](https://getcomposer.org) is required.

	composer require greencheap/library-netgsm
    
### Preparation

Net Gsm API gives you component structure, this allows you to escape unnecessary cost and is targeted. 
```php
require('./vendor/autoload.php');

use GreenCheap\NetGsm;

$netgsm = new NetGsm(3120000000 , 0000);
```

The NetGsm class expects you to enter 3 parameters;
- *Id:* Without 0 at the beginning of the number provided to you from the NetGsm firm.
- *Password:* The password you set for the API account
- *Name:* `(It is not mandatory)` birlikte onaylanmış gönderici başlığı

The above example shows that you are ready to use this library. For subsequent operations you can use the NetGsm API components.

### SMS Foundation
This component helps you implement the Sms transactions that Netgsm gives you.
#### Sms Sending

```php
require('../vendor/autoload.php');

use GreenCheap\NetGsm;
use GreenCheap\Components\SmsFoundation;

$netgsm = new NetGsm(3120000000 , 0000);
$smsFoundation = new SmsFoundation($netgsm);
$msg = $smsFoundation->sendMessage('5550000000' , 'Hello World! I am GreenCheap');

print_r($msg);
```

Output:

    status => success
    code => 00
    message => 00 612771191
    
### Error Messages

During sending operations, you can see the 'Error' error in the 'Status' key in the outputs. As a result, it shows you that things have gone wrong. The full documentation on this topic is given below.

|Code|Description|
|----|--------|
|`20`|It means that it cannot be sent due to a problem in the message text or that it exceeds the standard maximum number of message characters.|
|`30`|Indicates an invalid user name, password or that your user does not have API access permission.In addition if you have limited IP access to the API and provide sending outside of the IP that you have limited you will receive error code 30. You can control your API access permission or IP restriction from the web interface , in the settings> API operations menu in the upper-right corner.|
|`40`|Indicates that your message header (Sender Name) is not defined in the system. You can check your sender names by querying them with the API.|
|`70`|Erroneous interrogation. One of the parameters you send is incorrect or one of the required fields is missing.|

#### Incoming SMS
With this function, your messages that you specify between two dates are brought to you in a series.

`Note: `Because of a problem caused by netgsm, you can get 60 error types when using this function. This situation is caused by NetGsm.

```php
require('../vendor/autoload.php');

use GreenCheap\NetGsm;
use GreenCheap\Components\SmsFoundation;

$netgsm = new NetGsm(3120000000 , 0000);
$smsFoundation = new SmsFoundation($netgsm);

$startDate = new \DateTime();
$stopDate = new \DateTime();
$getMessages = $smsFoundation->getMessages($startDate->modify('-1 day')->format(NetGsm::DATETIME) , $stopDate->format(NetGsm::DATETIME));

print_r($getMessages);
```