# Chrome Web Store Listing — HızlıOku Web Asistanı

> Last Updated: 2026-11-20

## Store Listing

**Extension Name** [REQUIRED]
HızlıOku — Web Hızlı Okuma Asistanı

**Short Description** [REQUIRED]
Web sayfalarındaki seçili metinleri veya makaleleri RSVP ve Bionic Reading teknolojisiyle anında 3 kat hızlı okuyun.

**Detailed Description** [REQUIRED]
HızlıOku, web tarayıcınızda okuma hızınızı ve kavrama kapasitenizi ikiye katlayan bilimsel ve açık kaynaklı hızlı okuma yardımcınızdır.

Öne Çıkan Özellikler:
- Sayfa Üzerinde Doğrudan RSVP Okuma: Herhangi bir web sitesinde (haber, makale, araştırma veya Wikipedia) bir metni seçip sağ tıklayarak doğrudan sayfa üzerinde akıcı hızlı okuma penceresini başlatın.
- Optimum Tanıma Noktası (ORP) Fiksasyonu: Göz kaslarınızın satır boyunca yorucu sıçramalar (sakkadlar) yapmasını önler; kelimelerin odak merkezini kırmızı fiksasyon imleciyle tam göz hizasına getirir.
- Dinamik Noktalama ve Bilişsel Duraklama: Cümle sonlarında ve noktalama işaretlerinde beyne kavrama payı bırakan akıllı tempo ayarlamasıyla anlam kaybını önler.
- Bionic Reading Uyumluluğu: Sözcüklerin ilk harflerini belirginleştirerek gözün kelimeyi anında yakalamasını sağlar.
- Göz Sağlığı Dostu: Koyu ve açık tema desteği ve 20-20-20 mola asistanı ile göz yorgunluğunu (astenopi) minimuma indirir.

Nasıl Kullanılır:
1. Herhangi bir web sayfasında okumak istediğiniz paragrafı veya metni seçin.
2. Sağ tıklayın ve "HızlıOku ile Oku" seçeneğini tıklayın (veya uzantı simgesinden "Seçili Metni Oku"ya basın).
3. Ekrana gelen minimalist okuma penceresinde hızınızı (WPM) ayarlayın, Boşluk tuşu ile duraklatıp başlatın.

Gizlilik ve Güvenlik:
HızlıOku %100 yerel ve istemci tarafında (tarayıcınızın içinde) çalışır. Okuduğunuz hiçbir metin, sayfa içeriği veya tarama verisi harici sunuculara iletilmez veya kaydedilmez. Sıfır veri toplama ve tam gizlilik garantisi sunar.

Destek ve Açık Kaynak:
Proje GitHub üzerinde tamamen açık kaynaklı olarak geliştirilmektedir: https://github.com/mserman90/hizlioku

**Category** [REQUIRED]
Productivity

**Single Purpose** [REQUIRED]
Web sayfalarında seçilen herhangi bir metni RSVP ve Bionic Reading yöntemleriyle hızlı ve odaklanmış şekilde okutmak.

**Primary Language** [REQUIRED]
Turkish

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | `extension/icons/icon-128.png` |
| Screenshot 1 [REQUIRED] | 1280×800 | ⬜ Not created | `extension/screenshots/screenshot-1.png` |
| Screenshot 2 [RECOMMENDED] | 1280×800 | ⬜ Not created | `extension/screenshots/screenshot-2.png` |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | `extension/screenshots/promo-small.png` |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | `extension/screenshots/marquee.png` |

### Screenshot Notes
- Screenshot 1: Web sayfasında metin seçimi ve sağ tık menüsündeki "HızlıOku ile Oku" aksiyonu.
- Screenshot 2: Sayfa üzerinde açılan şık RSVP okuyucu penceresi, kırmızı ORP odak noktası ve hız kaydırıcısı.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `contextMenus` | permissions | Kullanıcının web sayfalarında fare ile seçtiği metne sağ tıklayarak 'HızlıOku ile Oku' kısayolunu kullanabilmesi için gereklidir. |
| `activeTab` | permissions | Kullanıcının sağ tıkladığı veya uzantı butonuna bastığı anlık aktif sekmedeki seçili metni okuma penceresine aktarmak için gereklidir. |
| `scripting` | permissions | Aktif sekmeye minimalist RSVP okuyucu arayüzünü (modal) ve stil dosyasını enjekte etmek için gereklidir. |
| `storage` | permissions | Kullanıcının tercih ettiği okuma hızını (WPM) ve okuyucu ayarlarını tarayıcıda yerel olarak saklamak için gereklidir. |

## Privacy & Data Use

### Data Collection
- Kullanıcıdan hiçbir kişisel bilgi, kimlik veya tarama geçmişi toplanmaz.
- İstemci tarafında sıfır veri transferi politikası uygulanır (No remote servers).
- Tek izinler yerel arayüz enjeksiyonu ve kullanıcı ayarları saklaması ile sınırlıdır.

## Version History

### Version 1.0.0 — 2026-11-20
- İlk kararlı sürüm yayınlandı.
- Sağ tık "HızlıOku ile Oku" bağlam menüsü desteği.
- Sayfa içi yarı saydam arka planlı RSVP modal okuyucu.
- Kırmızı ORP (Optimal Recognition Point) fiksasyon imleci.
- Dinamik noktalama ve morfolojik duraklama temposu.
- Boşluk tuşu (Oynat/Duraklat) ve Esc tuşu (Kapat) klavye kısayolları.
- Açık/Koyu tema otomatik algılama.
