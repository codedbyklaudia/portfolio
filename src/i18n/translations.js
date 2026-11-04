// ── Every translation on the site, in one file ──
// Each entry is a key with its text in English (en), Polish (pl), Italian (it), German (de)
// and Japanese (ja). Components read them with t('key'); a missing language falls back to
// English. Add a new language by adding its code to every entry and to LANGUAGES in
// src/context/LanguageContext.jsx.

export const translations = {
  // ── Shared bits: the page title, London, the music player, screen-reader labels ──
  'meta.title': {
    en: 'codedbyklaudia - Web & App Developer',
    pl: 'codedbyklaudia - programistka stron i aplikacji',
    it: 'codedbyklaudia - sviluppatrice web e app',
    de: 'codedbyklaudia - Web- & App-Entwicklerin',
    ja: 'codedbyklaudia - Web・アプリ開発者',
  },
  'common.close': { en: 'Close', pl: 'Zamknij', it: 'Chiudi', de: 'Schließen', ja: '閉じる' },
  // The project page: a little desktop with a menu bar and working windows
  'pp.allProjects': { en: 'All projects', pl: 'Wszystkie projekty', it: 'Tutti i progetti', de: 'Alle Projekte', ja: 'すべてのプロジェクト' },
  'pp.menu.overview': { en: 'Overview', pl: 'Przegląd', it: 'Panoramica', de: 'Überblick', ja: '概要' },
  'pp.menu.screenshots': { en: 'Gallery', pl: 'Galeria', it: 'Galleria', de: 'Galerie', ja: 'ギャラリー' },
  'pp.menu.notes': { en: 'Notes', pl: 'Notatki', it: 'Note', de: 'Notizen', ja: 'メモ' },
  'pp.info.kind': { en: 'Kind', pl: 'Rodzaj', it: 'Tipo', de: 'Art', ja: '種類' },
  'pp.info.category': { en: 'Category', pl: 'Kategoria', it: 'Categoria', de: 'Kategorie', ja: 'カテゴリ' },
  'pp.info.year': { en: 'Year', pl: 'Rok', it: 'Anno', de: 'Jahr', ja: '年' },
  'pp.readme': { en: 'About this project', pl: 'O projekcie', it: 'Il progetto', de: 'Über das Projekt', ja: 'このプロジェクトについて' },
  'pp.dragNotes': { en: '(psst, you can drag these around)', pl: '(psst, możesz je przeciągać)', it: '(psst, puoi trascinarle)', de: '(psst, die kannst du verschieben)', ja: '（ないしょ：ドラッグで動かせます）' },
  'pp.story.cta': { en: 'Take the tour', pl: 'Zobacz od środka', it: 'Fai un giro', de: 'Zur Tour', ja: 'ツアーを見る' },
  'common.london': { en: 'London', pl: 'Londyn', it: 'Londra', de: 'London', ja: 'ロンドン' },
  'common.londonUk': { en: 'London, UK', pl: 'Londyn, Wielka Brytania', it: 'Londra, Regno Unito', de: 'London, Großbritannien', ja: 'イギリス・ロンドン' },
  'music.album': { en: 'Desktop Sessions', pl: 'Sesje przy biurku', it: 'Sessioni alla scrivania', de: 'Schreibtisch-Sessions', ja: 'デスクトップ・セッション' },
  'music.restart': { en: 'Back to the start', pl: 'Wróć na początek', it: "Torna all'inizio", de: 'Zurück zum Anfang', ja: '最初に戻る' },
  'music.playFromStart': { en: 'Play from the start', pl: 'Odtwórz od początku', it: "Riproduci dall'inizio", de: 'Von vorne abspielen', ja: '最初から再生' },
  'music.play': { en: 'Play', pl: 'Odtwórz', it: 'Riproduci', de: 'Abspielen', ja: '再生' },
  'music.pause': { en: 'Pause', pl: 'Wstrzymaj', it: 'Pausa', de: 'Pausieren', ja: '一時停止' },
  'a11y.textSmaller': { en: 'Decrease text size', pl: 'Zmniejsz tekst', it: 'Riduci il testo', de: 'Text verkleinern', ja: '文字を小さく' },
  'a11y.textBigger': { en: 'Increase text size', pl: 'Powiększ tekst', it: 'Ingrandisci il testo', de: 'Text vergrößern', ja: '文字を大きく' },
  'folder.open': { en: 'Open folder', pl: 'Otwórz folder', it: 'Apri la cartella', de: 'Ordner öffnen', ja: 'フォルダを開く' },
  'folder.close': { en: 'Close folder', pl: 'Zamknij folder', it: 'Chiudi la cartella', de: 'Ordner schließen', ja: 'フォルダを閉じる' },
  'project.openScreenshot': { en: 'open screenshot', pl: 'otwórz zrzut ekranu', it: 'apri lo screenshot', de: 'Screenshot öffnen', ja: 'スクリーンショットを開く' },
  'contact.mail.removeAttachment': { en: 'Remove attachment', pl: 'Usuń załącznik', it: "Rimuovi l'allegato", de: 'Anhang entfernen', ja: '添付ファイルを削除' },
  'contact.mail.emoji': { en: 'Emoji', pl: 'Emoji', it: 'Emoji', de: 'Emoji', ja: '絵文字' },

  // The topic chips in the contact form fill in the subject and start the message
  'contact.topic.website.subject': { en: 'A new website', pl: 'Nowa strona internetowa', it: 'Un nuovo sito web', de: 'Eine neue Website', ja: '新しいウェブサイトについて' },
  'contact.topic.website.starter': { en: "Hi Klaudia! I'd love a website for ", pl: 'Cześć Klaudio! Potrzebuję strony internetowej dla ', it: 'Ciao Klaudia! Mi piacerebbe un sito web per ', de: 'Hallo Klaudia! Ich hätte gern eine Website für ', ja: 'こんにちは、クラウディアさん！ウェブサイトの制作をお願いしたいです：' },
  'contact.topic.app.subject': { en: 'A new app', pl: 'Nowa aplikacja', it: 'Una nuova app', de: 'Eine neue App', ja: '新しいアプリについて' },
  'contact.topic.app.starter': { en: 'Hi Klaudia! I have an idea for an app: ', pl: 'Cześć Klaudio! Mam pomysł na aplikację: ', it: "Ciao Klaudia! Ho un'idea per un'app: ", de: 'Hallo Klaudia! Ich habe eine Idee für eine App: ', ja: 'こんにちは、クラウディアさん！アプリのアイデアがあります：' },
  'contact.topic.collab.subject': { en: "Let's work together", pl: 'Współpraca', it: 'Lavoriamo insieme', de: 'Lass uns zusammenarbeiten', ja: '一緒にお仕事しませんか' },
  'contact.topic.collab.starter': { en: "Hi Klaudia! I'd love to work with you on ", pl: 'Cześć Klaudio! Chętnie popracuję z Tobą nad ', it: 'Ciao Klaudia! Mi piacerebbe lavorare con te a ', de: 'Hallo Klaudia! Ich würde gern mit dir zusammenarbeiten an ', ja: 'こんにちは、クラウディアさん！一緒に取り組みたいことがあります：' },
  'contact.topic.hi.subject': { en: 'Hello!', pl: 'Cześć!', it: 'Ciao!', de: 'Hallo!', ja: 'こんにちは！' },
  'contact.topic.hi.starter': { en: 'Hi Klaudia! ', pl: 'Cześć Klaudio! ', it: 'Ciao Klaudia! ', de: 'Hallo Klaudia! ', ja: 'こんにちは、クラウディアさん！' },

  'footer.builtWith': {
    en: 'Built with 🩵 and lots of coffee.',
    pl: 'Zbudowane z 🩵 i mnóstwem kawy.',
    it: 'Realizzato con 🩵 e tanto caffè.',
    de: 'Erstellt mit 🩵 und viel Kaffee.',
    ja: '🩵とたくさんのコーヒーで作りました。',
  },
  'footer.backToTop': {
    en: 'Back to top',
    pl: 'Powrót na górę',
    it: 'Torna su',
    de: 'Nach oben',
    ja: 'トップへ戻る',
  },
  'footer.theme': {
    en: 'Theme',
    pl: 'Motyw',
    it: 'Tema',
    de: 'Design',
    ja: 'テーマ',
  },
  'footer.language': {
    en: 'Language',
    pl: 'Język',
    it: 'Lingua',
    de: 'Sprache',
    ja: '言語',
  },
  'footer.accessibility': {
    en: 'Accessibility',
    pl: 'Dostępność',
    it: 'Accessibilità',
    de: 'Barrierefreiheit',
    ja: 'アクセシビリティ',
  },
  'footer.fontSize': {
    en: 'Text size',
    pl: 'Rozmiar tekstu',
    it: 'Dimensione testo',
    de: 'Textgröße',
    ja: '文字サイズ',
  },
  'footer.reduceMotion': {
    en: 'Reduce motion',
    pl: 'Ogranicz animacje',
    it: 'Riduci animazioni',
    de: 'Bewegung reduzieren',
    ja: 'モーションを減らす',
  },
  'footer.highContrast': {
    en: 'High contrast',
    pl: 'Wysoki kontrast',
    it: 'Alto contrasto',
    de: 'Hoher Kontrast',
    ja: 'ハイコントラスト',
  },
  'footer.reset': {
    en: 'Reset',
    pl: 'Resetuj',
    it: 'Reimposta',
    de: 'Zurücksetzen',
    ja: 'リセット',
  },
  'footer.contactLabel': {
    en: 'Contact',
    pl: 'Kontakt',
    it: 'Contatti',
    de: 'Kontakt',
    ja: 'お問い合わせ',
  },
  'footer.navigationLabel': {
    en: 'Navigation',
    pl: 'Nawigacja',
    it: 'Navigazione',
    de: 'Navigation',
    ja: 'ナビゲーション',
  },
  'footer.settingsLabel': {
    en: 'Settings',
    pl: 'Ustawienia',
    it: 'Impostazioni',
    de: 'Einstellungen',
    ja: '設定',
  },
  'footer.locationLabel': {
    en: 'Location',
    pl: 'Lokalizacja',
    it: 'Posizione',
    de: 'Standort',
    ja: '所在地',
  },
  'footer.allRightsReserved': {
    en: 'All rights reserved.',
    pl: 'Wszelkie prawa zastrzeżone.',
    it: 'Tutti i diritti riservati.',
    de: 'Alle Rechte vorbehalten.',
    ja: '全著作権所有。',
  },
  'footer.availableWorldwide': {
    en: 'Available for freelance projects worldwide.',
    pl: 'Dostępna do projektów freelance na całym świecie.',
    it: 'Disponibile per progetti freelance in tutto il mondo.',
    de: 'Verfügbar für Freelance-Projekte weltweit.',
    ja: '世界中のフリーランス案件に対応可能です。',
  },
  'footer.ctaTitle': {
    en: 'Let’s build something together.',
    pl: 'Zbudujmy coś razem.',
    it: 'Costruiamo qualcosa insieme.',
    de: 'Lass uns gemeinsam etwas bauen.',
    ja: '一緒に何かをつくりましょう。',
  },
  'footer.availableFullTime': {
    en: 'Available to work full-time as a Web/App Developer.',
    pl: 'Dostępna do pracy na pełen etat jako Web/App Developer.',
    it: 'Disponibile a lavorare a tempo pieno come Web/App Developer.',
    de: 'Verfügbar für eine Vollzeitstelle als Web/App Developer.',
    ja: 'Web/アプリ開発者としてフルタイムでの勤務が可能です。',
  },
  'nav.about': {
    en: 'About', pl: 'O mnie', it: 'Chi sono', de: 'Über mich', ja: '概要',
  },
  'nav.contact': {
    en: 'Contact', pl: 'Kontakt', it: 'Contatti', de: 'Kontakt', ja: 'お問い合わせ',
  },
  'nav.projects': {
    en: 'Projects', pl: 'Projekty', it: 'Progetti', de: 'Projekte', ja: 'プロジェクト',
  },
  'nav.skills': {
    en: 'Skills', pl: 'Umiejętności', it: 'Competenze', de: 'Fähigkeiten', ja: 'スキル',
  },
  'nav.story': {
    en: 'Story', pl: 'Historia', it: 'Storia', de: 'Geschichte', ja: 'ストーリー',
  },
  'nav.getInTouch': {
    en: 'Get in touch', pl: 'Skontaktuj się', it: 'Contattami', de: 'Kontakt aufnehmen', ja: 'お問い合わせ',
  },
  'nav.aboutMe': {
    en: 'About Me', pl: 'O mnie', it: 'Chi sono', de: 'Über mich', ja: '私について',
  },
  'nav.superpowers': {
    en: 'My Superpowers', pl: 'Moje supermoce', it: 'I miei superpoteri', de: 'Meine Superkräfte', ja: '私のスーパーパワー',
  },

  'contact.title1': { en: "Let's build", pl: 'Zbudujmy', it: 'Costruiamo', de: 'Lass uns', ja: '一緒に' },
  'contact.title2': { en: ' something', pl: ' coś', it: ' qualcosa', de: ' etwas', ja: ' 何か' },
  'contact.title3': { en: 'great.', pl: 'wspaniałego.', it: 'di grandioso.', de: 'Großartiges bauen.', ja: 'すごいものを作りましょう。' },

  'contact.title3Words': {
    en: ['great.', 'amazing.', 'real.', 'wonderful.'],
    pl: ['wspaniałego.', 'niesamowitego.', 'realnego.', 'wyjątkowego.'],
    it: ['di grandioso.', 'di straordinario.', 'di reale.', 'di unico.'],
    de: ['Großartiges.', 'Erstaunliches.', 'Echtes.', 'Einzigartiges.'],
    ja: ['すごいものを。', '驚くべきものを。', '本物を。', '特別なものを。'],
  },
  'contact.cta': { en: "Let's talk", pl: 'Porozmawiajmy', it: 'Parliamone', de: 'Lass uns reden', ja: '話しましょう' },
  'contact.back': { en: 'Back', pl: 'Wstecz', it: 'Indietro', de: 'Zurück', ja: '戻る' },
  'contact.mail.newMessage': { en: 'New Message', pl: 'Nowa wiadomość', it: 'Nuovo messaggio', de: 'Neue Nachricht', ja: '新規メッセージ' },
  'contact.mail.to': { en: 'To:', pl: 'Do:', it: 'A:', de: 'An:', ja: '宛先:' },
  'contact.mail.from': { en: 'From:', pl: 'Od:', it: 'Da:', de: 'Von:', ja: '差出人:' },
  'contact.mail.subject': { en: 'Subject:', pl: 'Temat:', it: 'Oggetto:', de: 'Betreff:', ja: '件名:' },
  'contact.mail.fromPlaceholder': { en: 'your@email.com', pl: 'twoj@email.com', it: 'tua@email.com', de: 'deine@email.com', ja: 'your@email.com' },
  'contact.mail.subjectPlaceholder': { en: "Let's work together", pl: 'Współpracujmy', it: 'Lavoriamo insieme', de: 'Lass uns zusammenarbeiten', ja: '一緒に仕事をしましょう' },
  'contact.mail.bodyPlaceholder': { en: "Hey Klaudia, I'd love to...", pl: 'Cześć Klaudia, chciałbym...', it: 'Ciao Klaudia, mi piacerebbe...', de: 'Hey Klaudia, ich würde gerne...', ja: 'クラウディアさん、ぜひ...' },
  'contact.mail.send': { en: 'Send', pl: 'Wyślij', it: 'Invia', de: 'Senden', ja: '送信' },
  'contact.mail.sentTitle': { en: 'Message sent!', pl: 'Wiadomość wysłana!', it: 'Messaggio inviato!', de: 'Nachricht gesendet!', ja: 'メッセージを送信しました！' },
  'contact.mail.sentSub': { en: "I'll get back to you soon 🐾", pl: 'Odezwę się wkrótce 🐾', it: 'Ti risponderò presto 🐾', de: 'Ich melde mich bald 🐾', ja: '近いうちにご返信します🐾' },
  'contact.mail.newMessageBtn': { en: 'New Message', pl: 'Nowa wiadomość', it: 'Nuovo messaggio', de: 'Neue Nachricht', ja: '新規メッセージ' },

  'skills.headingPart1': { en: 'My', pl: 'Moje', it: 'I miei', de: 'Meine', ja: '私の' },
  'skills.headingPart2': { en: 'Superpowers', pl: 'Supermoce', it: 'Superpoteri', de: 'Superkräfte', ja: 'スーパーパワー' },
  'skills.caption': {
    en: 'A quick tour through the tools, languages, and ideas I use to bring projects to life — one app at a time.',
    pl: 'Krótki przegląd narzędzi, języków i pomysłów, których używam, by ożywiać projekty — jedna aplikacja na raz.',
    it: "Un rapido giro tra strumenti, linguaggi e idee che uso per dare vita ai progetti, un'app alla volta.",
    de: 'Ein kurzer Einblick in die Tools, Sprachen und Ideen, mit denen ich Projekte zum Leben erwecke — eine App nach der anderen.',
    ja: 'プロジェクトを形にするために使っているツールや言語、アイデアを少しだけご紹介します。',
  },
  'skills.generalQuote': {
    en: "I care as much about how something works as how it feels to use — every project is a chance to make both a little more thoughtful.",
    pl: 'Zależy mi zarówno na tym, jak coś działa, jak i na tym, jak się tego używa — każdy projekt to okazja, by obie te rzeczy dopracować.',
    it: "Mi importa tanto di come funziona qualcosa quanto di come si sente usandolo — ogni progetto è un'occasione per curare entrambi gli aspetti.",
    de: 'Mir ist genauso wichtig, wie etwas funktioniert, wie es sich in der Nutzung anfühlt — jedes Projekt ist eine Gelegenheit, beides ein bisschen durchdachter zu machen.',
    ja: '何かがどう動くかも、それを使う感覚も、同じくらい大切にしています——どのプロジェクトも、その両方を少し丁寧に磨き上げるチャンスです。',
  },
  'skills.dock.jumpTo': { en: 'Jump to', pl: 'Przejdź do', it: 'Vai a', de: 'Gehe zu', ja: '移動:' },
  'skills.dock.hint': {
    en: 'Click an icon to open', pl: 'Kliknij ikonę, aby otworzyć', it: "Clicca un'icona per aprire",
    de: 'Klicke auf ein Symbol zum Öffnen', ja: 'アイコンをクリックして開く',
  },
  'skills.chapters.ide.name': { en: 'Apps', pl: 'Aplikacje', it: 'App', de: 'Apps', ja: 'アプリ' },
  'skills.chapters.ide.story': {
    en: "This is where it all began. Building Android apps showed me how rewarding it is to create something people can actually download, use, and rely on every day. That's what got me hooked on software development.",
    pl: 'Tu wszystko się zaczęło. Tworzenie aplikacji na Androida pokazało mi, jak satysfakcjonujące jest budowanie czegoś, co ludzie mogą pobrać, używać i na czym mogą polegać każdego dnia. Właśnie to sprawiło, że zakochałam się w programowaniu.',
    it: "È qui che tutto è iniziato. Creare app Android mi ha mostrato quanto sia gratificante costruire qualcosa che le persone possono scaricare, usare e su cui possono contare ogni giorno. È così che mi sono appassionata allo sviluppo software.",
    de: 'Hier hat alles begonnen. Android-Apps zu entwickeln hat mir gezeigt, wie erfüllend es ist, etwas zu bauen, das Menschen jeden Tag herunterladen, nutzen und sich darauf verlassen können. Genau das hat mich für die Softwareentwicklung begeistert.',
    ja: 'すべてはここから始まりました。Androidアプリを作る中で、人々が毎日ダウンロードして使い、頼りにしてくれるものを作る喜びを知りました。それが私をソフトウェア開発に夢中にさせたきっかけです。',
  },

  'skills.chapters.vscode.name': { en: 'Web Frontend', pl: 'Front-end', it: 'Frontend Web', de: 'Web-Frontend', ja: 'Webフロントエンド' },
  'skills.chapters.vscode.story': {
    en: "Curiosity eventually pulled me towards the web. I love bringing ideas to life with React and TypeScript, and I'm always chasing that balance between beautiful design, smooth interactions, and great performance.",
    pl: 'Ciekawość w końcu poprowadziła mnie w stronę webu. Uwielbiam ożywiać pomysły za pomocą Reacta i TypeScriptu i zawsze szukam równowagi między pięknym designem, płynnymi interakcjami a świetną wydajnością.',
    it: "La curiosità alla fine mi ha portata verso il web. Adoro dare vita alle idee con React e TypeScript, e cerco sempre l'equilibrio perfetto tra un design bellissimo, interazioni fluide e ottime prestazioni.",
    de: 'Die Neugier hat mich schließlich zum Web geführt. Ich liebe es, Ideen mit React und TypeScript zum Leben zu erwecken, und suche immer die Balance zwischen schönem Design, flüssigen Interaktionen und großartiger Performance.',
    ja: 'やがて好奇心がウェブの世界へと私を導きました。ReactとTypeScriptでアイデアを形にするのが大好きで、美しいデザインと滑らかな操作性、そして高いパフォーマンスのバランスを常に追求しています。',
  },

  'skills.chapters.code.name': { en: 'Backend', pl: 'Backend', it: 'Backend', de: 'Backend', ja: 'バックエンド' },
  'skills.chapters.code.story': {
    en: "I didn't want to stop at what users could see. Learning backend development helped me understand what powers an application behind the scenes—from APIs and databases to the logic that keeps everything running.",
    pl: 'Nie chciałam poprzestać na tym, co widzi użytkownik. Nauka backendu pomogła mi zrozumieć, co napędza aplikację od kulis — od API i baz danych po logikę, dzięki której wszystko działa.',
    it: "Non volevo fermarmi a ciò che gli utenti potevano vedere. Imparare lo sviluppo backend mi ha aiutata a capire cosa alimenta un'applicazione dietro le quinte, dalle API ai database fino alla logica che tiene tutto in funzione.",
    de: 'Ich wollte nicht nur bei dem stehen bleiben, was Nutzer sehen können. Backend-Entwicklung zu lernen hat mir gezeigt, was eine Anwendung hinter den Kulissen antreibt — von APIs und Datenbanken bis zur Logik, die alles am Laufen hält.',
    ja: 'ユーザーの目に見える部分だけでは満足できませんでした。バックエンド開発を学ぶことで、APIやデータベースから、すべてを動かし続けるロジックまで、アプリケーションを裏側で支える仕組みを理解できるようになりました。',
  },

  'skills.chapters.design.name': { en: 'Design', pl: 'Design', it: 'Design', de: 'Design', ja: 'デザイン' },
  'skills.chapters.design.story': {
    en: "I've always enjoyed the creative side of building things too. Good design isn't just about making something look nice—it's about making it intuitive, accessible, and enjoyable for the people using it.",
    pl: 'Zawsze lubiłam też kreatywną stronę tworzenia rzeczy. Dobry design to nie tylko ładny wygląd — chodzi o to, by był intuicyjny, dostępny i przyjemny dla osób, które z niego korzystają.',
    it: 'Ho sempre amato anche il lato creativo della creazione di cose. Un buon design non significa solo far sembrare qualcosa bello, ma renderlo intuitivo, accessibile e piacevole per chi lo utilizza.',
    de: 'Ich habe schon immer auch die kreative Seite des Erschaffens geliebt. Gutes Design bedeutet nicht nur, dass etwas gut aussieht — es geht darum, es intuitiv, zugänglich und angenehm für die Menschen zu machen, die es nutzen.',
    ja: 'ものづくりの創造的な側面もずっと好きでした。良いデザインとは、ただ見た目を良くすることではなく、それを使う人にとって直感的で、アクセスしやすく、心地よいものにすることだと思っています。',
  },

  'hero.role1': {
    en: 'Web & App', pl: 'Web & App', it: 'Web & App',
    de: 'Web & App', ja: 'Web & App',
  },
  'hero.role2': {
    en: 'Developer', pl: 'Developerka', it: 'Developer',
    de: 'Entwicklerin', ja: 'アプリ開発者',
  },
  'hero.location': {
    en: 'Located in London', pl: 'Mieszkam w Londynie', it: 'Con base a Londra',
    de: 'Ansässig in London', ja: 'ロンドン在住',
  },
  'hero.availability': {
    en: 'Available worldwide', pl: 'Dostępna na całym świecie', it: 'Disponibile in tutto il mondo',
    de: 'Weltweit verfügbar', ja: '世界中どこでも対応可能',
  },
  'hero.roleChipLabel': {
    en: 'See my work', pl: 'Zobacz moje projekty', it: 'Guarda i miei lavori',
    de: 'Meine Arbeiten ansehen', ja: '作品を見る',
  },
  'hero.folderLabel': {
    en: 'Projects', pl: 'Projekty', it: 'Progetti', de: 'Projekte', ja: 'プロジェクト',
  },
  'hero.folderLabelSub': {
    en: 'Scroll to open', pl: 'Przewiń, by otworzyć', it: 'Scorri per aprire',
    de: 'Scrollen zum Öffnen', ja: 'スクロールして開く',
  },
  'hero.doodleLabel': {
    en: "Yes, that's me!", pl: 'Tak, to ja!', it: 'Sì, sono io!',
    de: 'Ja, das bin ich!', ja: 'はい、私です!',
  },

  'hero.quote': {
    en: "Hey there! I'm Klaudia - happy to have you here.",
    pl: 'Cześć! Jestem Klaudia - cieszę się, że tu jesteś.',
    it: 'Ciao! Sono Klaudia - felice di averti qui.',
    de: 'Hallo! Ich bin Klaudia - schön, dass du hier bist.',
    ja: 'こんにちは！クラウディアです - 来てくれて嬉しいです。',
  },

  'hero.bio': {
    en: "Full-time developer, matcha addict, my dog's favourite human.",
    pl: 'Na co dzień programistka, w wolnych chwilach fanka matchy i ulubiona osoba mojego psa.',
    it: 'Sviluppatrice a tempo pieno, appassionata di matcha nel tempo libero, persona preferita del mio cane.',
    de: 'Vollzeit-Entwicklerin, Matcha-Liebhaberin und der Lieblingsmensch meines Hundes.',
    ja: 'フルタイムの開発者、抹茶好き、そして愛犬のいちばん好きな人。',
  },
  'hero.scrollHint': {
    en: 'Scroll to enter', pl: 'Przewiń, aby wejść', it: 'Scorri per entrare',
    de: 'Scrollen zum Eingeben', ja: 'スクロールして見る',
  },
  'hero.weatherCondition': {
    en: 'Sunny', pl: 'Słonecznie', it: 'Soleggiato', de: 'Sonnig', ja: '晴れ',
  },

  'about.kicker': { en: "Hello, I'm Klaudia", pl: 'Cześć, jestem Klaudia', it: 'Ciao, sono Klaudia', de: 'Hallo, ich bin Klaudia', ja: 'こんにちは、クラウディアです' },
  'about.intro': {
    en: "Programming is what I do, but it's definitely not all there is to me. Here's a glimpse into the things I'm curious about, the things I enjoy, and all the wonderfully random bits in between.",
    pl: 'Programowanie to to, czym zajmuję się na co dzień, ale zdecydowanie nie jest wszystkim, co mnie definiuje. Oto mały wgląd w to, co mnie ciekawi, co sprawia mi przyjemność i wszystkie te cudownie przypadkowe rzeczy pomiędzy.',
    it: 'Programmare è quello che faccio, ma decisamente non è tutto ciò che mi definisce. Ecco uno sguardo alle cose che mi incuriosiscono, a quelle che mi piacciono e a tutti quei piccoli e meravigliosi dettagli sparsi qua e là.',
    de: 'Programmieren ist das, was ich mache, aber definitiv nicht alles, was mich ausmacht. Hier bekommst du einen kleinen Einblick in die Dinge, die mich interessieren, die mir Freude machen, und all die wunderbar zufälligen Kleinigkeiten dazwischen.',
    ja: 'プログラミングは私の仕事ですが、それが私のすべてというわけではありません。ここでは、私が興味を持っていること、好きなこと、そしてその間にあるちょっとした素敵なあれこれをご紹介します。',
  },

  'about.notes.story': {
    en: 'About Me', pl: 'O mnie', it: 'Chi sono', de: 'Über mich', ja: '私について',
  },
  'about.notes.life': {
    en: 'Outside of Code', pl: 'Poza kodem', it: 'Fuori dal codice', de: 'Abseits vom Code', ja: 'コード以外の私',
  },
  'about.notes.facts': {
    en: 'Fun Facts', pl: 'Ciekawostki', it: 'Curiosità', de: 'Interessantes', ja: 'ちょっとした話',
  },
  'about.notes.availability': {
    en: 'Availability', pl: 'Dyspozycyjność', it: 'Disponibilità', de: 'Verfügbarkeit', ja: '対応状況',
  },
  'about.notes.skills': {
    en: 'Skills', pl: 'Umiejętności', it: 'Competenze', de: 'Fähigkeiten', ja: 'スキル',
  },
  'about.notes.icloudLabel': {
    en: 'iCloud', pl: 'iCloud', it: 'iCloud', de: 'iCloud', ja: 'iCloud',
  },
  'about.notes.otherLabel': {
    en: 'Other', pl: 'Inne', it: 'Altro', de: 'Andere', ja: 'その他',
  },
  'about.notes.recentlyDeleted': {
    en: 'Recently Deleted', pl: 'Ostatnio usunięte', it: 'Eliminati di recente', de: 'Kürzlich gelöscht', ja: '最近削除した項目',
  },

  'about.story.title': {
    en: 'So, who am I?',
    pl: 'No dobrze, kim właściwie jestem?',
    it: 'Allora, chi sono?',
    de: 'Also, wer bin ich eigentlich?',
    ja: 'さて、私はどんな人？',
  },
  'about.story.body1': {
    en: "I'm Klaudia, a software engineer who loves turning ideas into things that actually work. I've been fascinated by technology for as long as I can remember. As a teenager, I'd happily save up for the latest gadget rather than buy a new pair of shoes, and IT was always my favourite subject at school. Naturally, I ended up at hairdressing college first. Yes, really! For a while, I was making people's hair look good instead of making code behave. Life has a funny way of taking you in unexpected directions, doesn't it?",
    pl: "Mam na imię Klaudia i jestem inżynierką oprogramowania. Uwielbiam zamieniać pomysły w rzeczy, które naprawdę działają. Technologia fascynuje mnie, odkąd pamiętam. Jako nastolatka wolałam odkładać pieniądze na nowy gadżet niż na kolejną parę butów, a informatyka była zdecydowanie moim ulubionym przedmiotem w szkole. A jednak najpierw trafiłam do szkoły fryzjerskiej. Tak, serio! Przez jakiś czas zamiast okiełznywać kod, układałam ludziom włosy. Życie potrafi zaprowadzić nas w naprawdę nieoczekiwane miejsca, prawda?",
    it: "Sono Klaudia, una software engineer che ama trasformare le idee in qualcosa che funzioni davvero. La tecnologia mi affascina da sempre. Da adolescente mettevo volentieri da parte i soldi per un nuovo gadget invece di comprare un altro paio di scarpe, e Informatica era senza dubbio la mia materia preferita a scuola. Eppure, ho iniziato frequentando una scuola per parrucchieri. Sì, davvero! Per un po' mi sono dedicata a rendere belli i capelli delle persone invece di convincere il codice a collaborare. La vita sa portarci in direzioni davvero inaspettate, vero?",
    de: "Ich bin Klaudia, Softwareentwicklerin und liebe es, Ideen in Dinge zu verwandeln, die tatsächlich funktionieren. Technik hat mich schon fasziniert, solange ich denken kann. Als Teenager habe ich lieber für ein neues Gadget gespart als für ein weiteres Paar Schuhe, und Informatik war ganz klar mein Lieblingsfach in der Schule. Trotzdem bin ich zuerst an einer Friseurschule gelandet. Ja, wirklich! Eine Zeit lang habe ich dafür gesorgt, dass die Haare anderer Leute gut aussehen, statt Code dazu zu bringen, sich zu benehmen. Das Leben schlägt manchmal ganz unerwartete Wege ein, oder?",
    ja: "クラウディアです。アイデアを実際に動くものにするのが大好きなソフトウェアエンジニアです。物心ついた頃からテクノロジーに魅了されてきました。10代の頃は、新しい靴を買うよりもガジェットのためにお金を貯めるタイプで、学校では情報の授業が断トツで一番好きでした。それなのに、最初に進んだのは美容学校でした。そう、本当です！しばらくの間はコードを思いどおりに動かす代わりに、人の髪をきれいに仕上げていました。人生って、思いがけない方向に進むものですよね。"
  },
  'about.story.body2': {
    en: "My interest in tech never really went away, and eventually I decided to follow it. Today, I'm doing what I've always been drawn to: building things, solving problems, and bringing ideas to life. I also love exploring new places, discovering good coffee spots, and going for long walks with Nox, my Borgi and very enthusiastic sidekick. He doesn't know much about software, but he's an expert at taking credit for emotional support.",
    pl: "Moja fascynacja technologią nigdy tak naprawdę nie minęła, aż w końcu postanowiłam pójść za tym, co zawsze mnie ciągnęło. Dziś zajmuję się tym, co naprawdę lubię: tworzę, rozwiązuję problemy i zamieniam pomysły w rzeczywistość. Uwielbiam też odkrywać nowe miejsca, szukać dobrych kawiarni i chodzić na długie spacery z Noxem, moim Borgi i niezwykle zaangażowanym kompanem. Na programowaniu się nie zna, ale w przypisywaniu sobie zasług za wsparcie emocjonalne jest ekspertem.",
    it: "La mia passione per la tecnologia non mi ha mai davvero abbandonata, finché alla fine ho deciso di seguirla. Oggi faccio ciò che mi ha sempre attirata: costruire cose, risolvere problemi e trasformare le idee in realtà. Amo anche esplorare posti nuovi, scoprire bei locali dove bere un buon caffè e fare lunghe passeggiate con Nox, il mio Borgi e compagno di avventure super entusiasta. Di software non capisce molto, ma è un vero esperto nel prendersi il merito del supporto emotivo.",
    de: "Meine Begeisterung für Technik ist nie wirklich verschwunden, und irgendwann habe ich beschlossen, ihr zu folgen. Heute mache ich das, was mich schon immer gereizt hat: Dinge entwickeln, Probleme lösen und Ideen zum Leben erwecken. Außerdem entdecke ich gern neue Orte, probiere gemütliche Cafés aus und gehe mit Nox, meinem Borgi und übermotivierten Begleiter, lange spazieren. Von Software versteht er nicht viel, aber darin, sich für die emotionale Unterstützung feiern zu lassen, ist er ein echter Profi.",
    ja: "テクノロジーへの興味はずっと消えることがなく、最終的にその気持ちに従うことにしました。今は、ずっと惹かれてきたこと――ものを作り、問題を解決し、アイデアを形にすること――を仕事にしています。新しい場所を探検したり、おいしいコーヒーが飲めるお店を見つけたり、愛犬のNoxと長い散歩を楽しんだりするのも大好きです。Noxは私のBorgiで、とても張り切り屋な相棒です。ソフトウェアのことはよくわかっていませんが、心の支えとしての功績を自分のものにするのは得意です。"
  },

  'about.story.imgTag': {
    en: 'Me and Nox!', pl: 'Ja i Nox!', it: 'Io e Nox!', de: 'Ich und Nox!', ja: '私とノックス！',
  },

  'about.life.title': {
    en: "When I'm not coding",
    pl: 'Kiedy nie koduję',
    it: 'Quando non programmo',
    de: 'Wenn ich nicht programmiere',
    ja: 'コードを書いていないときの私',
  },
  'about.life.body1': {
    en: "I'm a yoga enthusiast, a matcha addict, and a fan of a (mostly) healthy lifestyle. Then there's Nox - my one-year-old dog and favourite adventure buddy. I spend way too much time teaching him new tricks, although honestly, he's probably the one who's trained me to hand out treats on demand.",
    pl: 'Jestem entuzjastką jogi, uzależnioną od matchy i fanką (w większości) zdrowego stylu życia. No i jest jeszcze Nox - mój roczny pies i ulubiony towarzysz przygód. Spędzam stanowczo za dużo czasu, ucząc go nowych sztuczek, chociaż szczerze mówiąc to raczej on wytresował mnie do rozdawania smakołyków na żądanie.',
    it: "Sono un'appassionata di yoga, dipendente dal matcha e fan di uno stile di vita (per lo più) sano. Poi c'è Nox - il mio cane di un anno e compagno di avventure preferito. Passo troppo tempo a insegnargli nuovi trucchi, anche se, onestamente, è probabilmente lui ad avermi addestrata a distribuire premi a comando.",
    de: 'Ich bin Yoga-Fan, matcha-süchtig und Anhängerin eines (größtenteils) gesunden Lebensstils. Dann ist da noch Nox - mein einjähriger Hund und liebster Abenteuerpartner. Ich verbringe viel zu viel Zeit damit, ihm neue Tricks beizubringen, obwohl ehrlich gesagt eher er mich darauf trainiert hat, auf Kommando Leckerlis zu verteilen.',
    ja: 'ヨガに夢中で、抹茶がないと落ち着かなくて、（だいたい）健康的な暮らしを心がけています。そしてもう一人の主役はノックス——1歳になる愛犬で、私の一番の冒険仲間です。新しい芸を教えるのに時間をかけすぎていますが、正直なところ、おやつを要求どおりに出させる技を仕込まれたのは私の方かもしれません。',
  },
  'about.life.body2': {
    en: "I'm also unapologetically obsessed with magic - especially Harry Potter. That's exactly where Nox got his name from.",
    pl: "Jestem też bezwstydną fanką magii - zwłaszcza Harry'ego Pottera. I właśnie stąd wzięło się imię Noxa.",
    it: "Sono anche una fan sfacciata della magia - in particolare di Harry Potter. Ed è proprio da lì che arriva il nome di Nox.",
    de: 'Ich bin außerdem schamlos besessen von Magie - vor allem von Harry Potter. Genau daher stammt auch Noxs Name.',
    ja: '魔法にも遠慮なくハマっています——特にハリー・ポッター。ノックスの名前もそこから取りました。',
  },
  'about.life.imgTag': {
    en: 'Nox 🐾', pl: 'Nox 🐾', it: 'Nox 🐾', de: 'Nox 🐾', ja: 'ノックス 🐾',
  },

  'about.facts.title': {
    en: 'The little things that make me, me.',
    pl: 'Małe rzeczy, które sprawiają, że jestem sobą.',
    it: 'Le piccole cose che mi rendono quella che sono.',
    de: 'Die kleinen Dinge, die mich ausmachen.',
    ja: '私らしさをつくる、小さなこと。',
  },
  'about.facts.subtitle': {
    en: 'Nothing too serious - just the small stuff that fills up my normal day.',
    pl: 'Nic poważnego - tylko drobiazgi, z których składa się mój zwykły dzień.',
    it: 'Niente di troppo serio - solo le piccole cose che riempiono una giornata qualunque.',
    de: 'Nichts allzu Ernstes - nur die kleinen Dinge, aus denen ein normaler Tag besteht.',
    ja: 'たいしたことじゃないけれど、普段の日を彩る小さなあれこれです。',
  },
  'about.facts.item1': {
    en: 'Owned by a Borgi named Nox - technically my dog, spiritually my manager.',
    pl: 'Własność Borgiego imieniem Nox - technicznie mój pies, duchowo mój menedżer.',
    it: 'Di proprietà di un Borgi di nome Nox - tecnicamente il mio cane, spiritualmente il mio manager.',
    de: 'Im Besitz eines Borgis namens Nox - offiziell mein Hund, im Grunde mein Manager.',
    ja: 'ボーギー犬のノックスに飼われています - 名目上は私の犬、実質は私のマネージャー。',
  },
  'about.facts.item2': {
    en: 'CrossFit when I want to feel strong, yoga when I want my brain to switch off for an hour.',
    pl: 'CrossFit, kiedy chcę poczuć się silna, joga, kiedy chcę na godzinę wyłączyć mózg.',
    it: "CrossFit quando voglio sentirmi forte, yoga quando voglio spegnere il cervello per un'ora.",
    de: 'CrossFit, wenn ich mich stark fühlen will, Yoga, wenn mein Kopf für eine Stunde abschalten soll.',
    ja: '強さを感じたいときはクロスフィット、頭を1時間オフにしたいときはヨガ。',
  },
  'about.facts.item3': {
    en: 'Always up for a matcha — iced, blueberry, skimmed milk, no exceptions.',
    pl: 'Zawsze na tak, jeśli chodzi o matchę — jagodowa, na zimno, z mlekiem, bez wyjątków.',
    it: 'Sempre pronta per un matcha — ai mirtilli, ghiacciato, con latte scremato, senza eccezioni.',
    de: 'Immer bereit für einen Matcha — Heidelbeere, eisgekühlt, mit fettarmer Milch, keine Ausnahmen.',
    ja: '抹茶ならいつでも大歓迎——ブルーベリー、アイスで低脂肪乳、例外なし。',
  },
  'about.facts.item4': {
    en: "Never say no to a cinema night, as long as there's an unreasonable amount of nachos with cheese sauce involved.",
    pl: 'Nigdy nie odmawiam wieczoru w kinie, o ile jest przy tym absurdalna ilość nachosow z sosem serowym.',
    it: "Non dico mai di no a una serata al cinema, purché ci sia una quantità irragionevole di salsa al formaggio per i nachos.",
    de: 'Sage nie nein zu einem Kinoabend, solange eine unvernünftige Menge Nacho-Käsesoße mit im Spiel ist.',
    ja: '映画の夜には絶対にノーと言いません——ナチョスのチーズソースが常識外れの量である限り。',
  },

  'about.story.cvButton': {
    en: 'Download CV', pl: 'Pobierz CV', it: 'Scarica il CV', de: 'Lebenslauf herunterladen', ja: '履歴書をダウンロード',
  },
  'about.story.contactLink': {
    en: 'Or say hi',
    pl: 'Albo przywitaj się',
    it: 'Oppure dimmi ciao',
    de: 'Oder sag Hallo',
    ja: 'またはお気軽にどうぞ',
  },

  'projects.stickyNote': {
    en: 'Psst… open a folder. Go on, they don\'t bite!',
    pl: 'Psst… otwórz folder. Śmiało, nie gryzą!',
    it: 'Psst… apri una cartella. Dai, non mordono!',
    de: 'Psst… öffne einen Ordner. Nur Mut, die beißen nicht!',
    ja: 'ねえ…フォルダを開いてみて。噛みつかないから！',
  },

  'platform.android': {
    en: 'Android', pl: 'Android', it: 'Android', de: 'Android', ja: 'Android',
  },
  'platform.webPlatform': {
    en: 'Web Platform', pl: 'Platforma webowa', it: 'Piattaforma web',
    de: 'Web-Plattform', ja: 'ウェブプラットフォーム',
  },
  'platform.web': {
    en: 'Web', pl: 'Web', it: 'Web', de: 'Web', ja: 'ウェブ',
  },

  'category.majorProject': {
    en: 'Major Project', pl: 'Projekt dyplomowy', it: 'Progetto di laurea',
    de: 'Abschlussprojekt', ja: '卒業制作',
  },
  'category.collaborative': {
    en: 'Collaborative', pl: 'Projekt zespołowy', it: 'Progetto collaborativo',
    de: 'Kollaboratives Projekt', ja: '共同制作',
  },
  'category.portfolio': {
    en: 'Portfolio', pl: 'Portfolio', it: 'Portfolio', de: 'Portfolio', ja: 'ポートフォリオ',
  },
  'category.personalProject': {
    en: 'Personal Project', pl: 'Projekt własny', it: 'Progetto personale',
    de: 'Persönliches Projekt', ja: '個人プロジェクト',
  },

  'role.soloDeveloper': {
    en: 'Solo Developer', pl: 'Samodzielna programistka', it: 'Sviluppatrice unica',
    de: 'Alleinentwicklerin', ja: 'ソロ開発者',
  },
  'role.soloDeveloperDesigner': {
    en: 'Solo Developer & Designer', pl: 'Samodzielna programistka i projektantka',
    it: 'Sviluppatrice e designer unica', de: 'Alleinentwicklerin & Designerin',
    ja: 'ソロ開発者兼デザイナー',
  },
  'role.coDeveloper': {
    en: 'Co-Developer', pl: 'Współprogramistka', it: 'Co-sviluppatrice',
    de: 'Mitentwicklerin', ja: '共同開発者',
  },
  'role.coDeveloperScrumMaster': {
    en: 'Co-Developer · Scrum Master', pl: 'Współprogramistka · Scrum Master',
    it: 'Co-sviluppatrice · Scrum Master', de: 'Mitentwicklerin · Scrum Master',
    ja: '共同開発者・スクラムマスター',
  },

  'project.barkbuddyAndroid.tagline': {
    en: 'A native Android dog care app built solo as BSc Major Project.',
    pl: 'Natywna aplikacja na Androida do opieki nad psem, zbudowana samodzielnie jako praca dyplomowa BSc.',
    it: "Un'app Android nativa per la cura del cane, sviluppata da sola come progetto di laurea BSc.",
    de: 'Eine native Android-App für die Hundepflege, im Alleingang als BSc-Abschlussprojekt entwickelt.',
    ja: '単独で開発したBSc卒業制作の、犬のケアのためのネイティブAndroidアプリです。',
  },
  'project.barkbuddyAndroid.body1': {
    en: 'BarkBuddy Android is a full-featured native app built in Java - my BSc Major Project at SAE Institute London. Designed and developed entirely solo from concept to deployment.',
    pl: 'BarkBuddy Android to w pełni funkcjonalna natywna aplikacja napisana w Javie — moja praca dyplomowa BSc w SAE Institute London. Zaprojektowana i stworzona całkowicie samodzielnie, od koncepcji po wdrożenie.',
    it: "BarkBuddy Android è un'app nativa completa scritta in Java — il mio progetto di laurea BSc al SAE Institute London. Progettata e sviluppata interamente da sola, dal concept al deployment.",
    de: 'BarkBuddy Android ist eine voll ausgestattete native App, entwickelt in Java — mein BSc-Abschlussprojekt am SAE Institute London. Vollständig im Alleingang konzipiert und entwickelt, vom Konzept bis zur Veröffentlichung.',
    ja: 'BarkBuddy AndroidはJavaで構築されたフル機能のネイティブアプリで、SAE Institute LondonでのBSc卒業制作です。コンセプトからリリースまで、すべて一人で設計・開発しました。',
  },
  'project.barkbuddyAndroid.body2': {
    en: 'The app features a walk tracker with a 18-badge gamification system, AI-powered care tips via Gemini 2.5 Flash, real-time group chat using Socket.io and Firebase FCM push notifications, a service finder with Google Maps integration, a health calendar with colour-coded events, and a complete forum.',
    pl: 'Aplikacja oferuje tracker spacerów z systemem grywalizacji opartym na 18 odznakach, wskazówki opiekuńcze wspierane przez AI (Gemini 2.5 Flash), czat grupowy w czasie rzeczywistym oparty na Socket.io i powiadomieniach push Firebase FCM, wyszukiwarkę usług zintegrowaną z Mapami Google, kalendarz zdrowia z kolorowo oznaczonymi wydarzeniami oraz pełnoprawne forum.',
    it: "L'app include un tracker delle passeggiate con un sistema di gamification a 18 badge, consigli di cura basati sull'AI tramite Gemini 2.5 Flash, chat di gruppo in tempo reale con Socket.io e notifiche push Firebase FCM, un motore di ricerca servizi con integrazione Google Maps, un calendario della salute con eventi codificati a colori e un forum completo.",
    de: 'Die App bietet einen Spaziergangs-Tracker mit einem 18-Abzeichen-Gamification-System, KI-gestützte Pflegetipps über Gemini 2.5 Flash, Echtzeit-Gruppenchat mit Socket.io und Firebase-FCM-Push-Benachrichtigungen, eine Dienstleistungssuche mit Google-Maps-Integration, einen farblich codierten Gesundheitskalender und ein vollständiges Forum.',
    ja: 'このアプリには、18種のバッジによるゲーミフィケーション機能付きの散歩トラッカー、Gemini 2.5 FlashによるAIケアアドバイス、Socket.ioとFirebase FCMプッシュ通知を使ったリアルタイムグループチャット、Googleマップ連携のサービス検索、色分けされた健康カレンダー、そして本格的なフォーラムが搭載されています。',
  },
  'project.barkbuddyAndroid.shot1': {
    en: "The sign-in screen — email and password, with Google and Apple sign-in as quick alternatives for anyone who'd rather skip typing a password.",
    pl: 'Ekran logowania — e-mail i hasło, a dla tych, którzy wolą pominąć wpisywanie hasła, szybkie logowanie przez Google i Apple.',
    it: "La schermata di accesso — email e password, con accesso rapido tramite Google e Apple per chi preferisce evitare di digitare una password.",
    de: 'Der Anmeldebildschirm — E-Mail und Passwort, mit Google- und Apple-Anmeldung als schnelle Alternative für alle, die lieber kein Passwort eintippen.',
    ja: 'サインイン画面——メールアドレスとパスワードに加え、パスワード入力を省きたい人のためにGoogleとAppleでのクイックサインインも用意しています。',
  },
  'project.barkbuddyAndroid.shot2': {
    en: 'The home dashboard greets you by name and surfaces your current walk streak front and centre, alongside quick access to the calendar, forum, walk tracker, and buddy pack.',
    pl: 'Pulpit główny wita cię po imieniu i od razu pokazuje twoją aktualną passę spacerów, a obok tego szybki dostęp do kalendarza, forum, trackera spacerów i grupy znajomych.',
    it: "La dashboard principale ti accoglie con il tuo nome e mette in primo piano la tua serie attuale di passeggiate, insieme all'accesso rapido a calendario, forum, tracker delle passeggiate e branco di amici.",
    de: 'Das Start-Dashboard begrüßt dich mit deinem Namen und zeigt deine aktuelle Spaziergangs-Serie prominent an, zusammen mit schnellem Zugriff auf Kalender, Forum, Spaziergangs-Tracker und Buddy-Pack.',
    ja: 'ホームダッシュボードでは名前で挨拶され、現在の散歩連続記録が中央に大きく表示されます。カレンダー、フォーラム、散歩トラッカー、バディパックへもすぐアクセスできます。',
  },
  'project.barkbuddyAndroid.shot3': {
    en: 'A colour-coded health calendar for vet visits, vaccinations, grooming appointments, and anything else worth remembering — colour by category, so a busy month is still easy to scan.',
    pl: 'Kolorowo oznaczony kalendarz zdrowia na wizyty u weterynarza, szczepienia, wizyty u groomera i wszystko inne, co warto zapamiętać — kolor według kategorii, dzięki czemu nawet napięty miesiąc łatwo ogarnąć wzrokiem.',
    it: "Un calendario della salute codificato a colori per visite veterinarie, vaccinazioni, appuntamenti di toelettatura e tutto ciò che vale la pena ricordare — colore per categoria, così anche un mese pieno di impegni resta facile da scorrere.",
    de: 'Ein farblich codierter Gesundheitskalender für Tierarztbesuche, Impfungen, Pflegetermine und alles andere, was man sich merken sollte — Farbe nach Kategorie, damit auch ein voller Monat übersichtlich bleibt.',
    ja: '獣医の診察、ワクチン接種、トリミングの予約など、覚えておきたい予定をカテゴリごとに色分けした健康カレンダー。忙しい月でも一目で把握できます。',
  },
  'project.barkbuddyAndroid.shot4': {
    en: 'Adding a new calendar event — pick a type, a date, and a few notes, and it slots straight into the colour-coded view without any extra steps.',
    pl: 'Dodawanie nowego wydarzenia do kalendarza — wybierz typ, datę i kilka notatek, a od razu trafi do kolorowego widoku, bez żadnych dodatkowych kroków.',
    it: "Aggiungere un nuovo evento al calendario — scegli un tipo, una data e qualche nota, e si inserisce direttamente nella vista a colori senza passaggi extra.",
    de: 'Ein neues Kalenderereignis hinzufügen — Typ, Datum und ein paar Notizen auswählen, und es erscheint sofort in der farblich codierten Ansicht, ganz ohne zusätzliche Schritte.',
    ja: '新しいカレンダーの予定を追加——種類、日付、メモを選ぶだけで、余計な手順なしにそのまま色分け表示に反映されます。',
  },
  'project.barkbuddyAndroid.shot5': {
    en: 'Live walk tracking with distance, pace, and a route map, feeding into an 18-badge gamification system that rewards consistency rather than just distance covered.',
    pl: 'Śledzenie spaceru na żywo z dystansem, tempem i mapą trasy, zasilające system 18 odznak, który nagradza regularność, a nie tylko pokonany dystans.',
    it: "Tracciamento della passeggiata in tempo reale con distanza, ritmo e mappa del percorso, che alimenta un sistema di gamification a 18 badge che premia la costanza, non solo la distanza percorsa.",
    de: 'Live-Spaziergangs-Tracking mit Distanz, Tempo und Routenkarte, das in ein 18-Abzeichen-Gamification-System einfließt, das Beständigkeit statt nur zurückgelegte Distanz belohnt.',
    ja: '距離・ペース・ルートマップをリアルタイムで記録する散歩トラッキング機能。18種のバッジによるゲーミフィケーションは、距離だけでなく継続そのものを評価します。',
  },
  'project.barkbuddyAndroid.shot6': {
    en: "A multi-step travel planner that walks you through what a trip with your dog actually needs — continent by continent, so nothing gets forgotten at the airport.",
    pl: 'Wieloetapowy planer podróży, który krok po kroku pokazuje, czego naprawdę potrzeba na wyjazd z psem — kontynent po kontynencie, żeby nic nie zostało zapomniane na lotnisku.',
    it: "Un pianificatore di viaggio a più fasi che ti guida attraverso ciò di cui un viaggio con il tuo cane ha davvero bisogno — continente per continente, così nulla viene dimenticato in aeroporto.",
    de: 'Ein mehrstufiger Reiseplaner, der dich Schritt für Schritt durch das führt, was eine Reise mit deinem Hund wirklich braucht — Kontinent für Kontinent, damit am Flughafen nichts vergessen wird.',
    ja: '犬との旅行に本当に必要なものを大陸ごとに順を追って案内する、複数ステップの旅行プランナー。空港で忘れ物をする心配がありません。',
  },
 'project.barkbuddyAndroid.shot7' : {
    en: 'A multi-step registration flow for pet owners asking for their dog details such as breed, age, size and temperament, which users can then edit in the Profile Section.',
    pl: 'Wieloetapowy proces rejestracji dla właścicieli zwierząt, obejmujący podanie informacji o psie, takich jak rasa, wiek, wielkość i temperament, które użytkownicy mogą następnie edytować w sekcji Profil.',
    it: 'Un flusso di registrazione a più fasi per i proprietari di animali, che richiede i dettagli del proprio cane, come razza, età, taglia e temperamento, che gli utenti possono successivamente modificare nella sezione Profilo.',
    de: 'Ein mehrstufiger Registrierungsprozess für Tierbesitzer, bei dem Angaben zum Hund wie Rasse, Alter, Größe und Temperament erfasst werden, die anschließend im Profilbereich bearbeitet werden können.',
    ja: 'ペットの飼い主向けの複数ステップの登録フロー。犬の犬種、年齢、サイズ、性格などの情報を入力し、登録後はプロフィールセクションで編集できます。',
  },

  'project.barkbuddyWeb.tagline': {
    en: 'A React web platform sharing the same backend as the Android app.',
    pl: 'Platforma webowa w Reakcie, korzystająca z tego samego backendu co aplikacja na Androida.',
    it: "Una piattaforma web in React che condivide lo stesso backend dell'app Android.",
    de: 'Eine React-Webplattform, die sich das gleiche Backend wie die Android-App teilt.',
    ja: 'Androidアプリと同じバックエンドを共有する、React製のウェブプラットフォームです。',
  },
  'project.barkbuddyWeb.body1': {
    en: 'The web side of BarkBuddy - built in React/TypeScript with SCSS, sharing the same Node.js/PostgreSQL backend as the Android app. Designed to serve both pet owners and service providers.',
    pl: 'Webowa strona BarkBuddy - zbudowana w React/TypeScript z SCSS, korzystająca z tego samego backendu Node.js/PostgreSQL co aplikacja na Androida. Zaprojektowana z myślą zarówno o właścicielach zwierząt, jak i dostawcach usług.',
    it: "Il lato web di BarkBuddy - realizzato in React/TypeScript con SCSS, che condivide lo stesso backend Node.js/PostgreSQL dell'app Android. Progettato per servire sia i proprietari di animali che i fornitori di servizi.",
    de: 'Die Web-Seite von BarkBuddy - entwickelt in React/TypeScript mit SCSS, mit demselben Node.js/PostgreSQL-Backend wie die Android-App. Konzipiert, um sowohl Haustierbesitzer als auch Dienstleister zu bedienen.',
    ja: 'BarkBuddyのウェブ版——React/TypeScriptとSCSSで構築され、Androidアプリと同じNode.js/PostgreSQLバックエンドを共有しています。飼い主とサービス提供者の両方に対応できるよう設計されています。',
  },
  'project.barkbuddyWeb.body2': {
    en: 'Features include a service finder with Google Maps, multi-step travel planner with PDF export, care tips, community forum, business registration and dashboard, and a full saved items system backed by PostgreSQL.',
    pl: 'Funkcje obejmują wyszukiwarkę usług z Mapami Google, wieloetapowy planer podróży z eksportem do PDF, wskazówki opiekuńcze, forum społecznościowe, rejestrację firm z panelem oraz pełny system zapisanych elementów oparty na PostgreSQL.',
    it: "Le funzionalità includono un motore di ricerca servizi con Google Maps, un pianificatore di viaggio a più fasi con esportazione PDF, consigli di cura, un forum della community, registrazione aziendale con dashboard e un sistema completo di elementi salvati basato su PostgreSQL.",
    de: 'Zu den Funktionen gehören eine Dienstleistungssuche mit Google Maps, ein mehrstufiger Reiseplaner mit PDF-Export, Pflegetipps, ein Community-Forum, Geschäftsregistrierung mit Dashboard und ein vollständiges, auf PostgreSQL basierendes System für gespeicherte Elemente.',
    ja: 'Googleマップ連携のサービス検索、PDF出力対応の複数ステップ旅行プランナー、ケアのヒント、コミュニティフォーラム、事業者登録とダッシュボード、そしてPostgreSQLで管理する保存アイテム機能を搭載しています。',
  },

  'project.henry.tagline': {
    en: "A portfolio site for London-based VFX artist Henry Claud N'Guetta.",
    pl: "Strona portfolio dla londyńskiego artysty VFX, Henry'ego Claud N'Guetta.",
    it: "Un sito portfolio per l'artista VFX londinese Henry Claud N'Guetta.",
    de: "Eine Portfolio-Website für den in London ansässigen VFX-Künstler Henry Claud N'Guetta.",
    ja: 'ロンドン拠点のVFXアーティスト、Henry Claud N\'Guetta氏のポートフォリオサイトです。',
  },
  'project.henry.body1': {
    en: "Freelance project for VFX artist Henry Claud N'Guetta - designed to let the work speak without distraction. Fast load times and a clean contact flow were the priority.",
    pl: "Projekt freelance dla artysty VFX Henry'ego Claud N'Guetta - zaprojektowany tak, by praca mówiła sama za siebie, bez zbędnych rozpraszaczy. Priorytetem był szybki czas ładowania i przejrzysty formularz kontaktowy.",
    it: "Progetto freelance per l'artista VFX Henry Claud N'Guetta - pensato per lasciare che il lavoro parli da sé, senza distrazioni. La priorità erano tempi di caricamento rapidi e un flusso di contatto pulito.",
    de: "Freelance-Projekt für den VFX-Künstler Henry Claud N'Guetta - konzipiert, damit die Arbeit für sich spricht, ohne Ablenkung. Schnelle Ladezeiten und ein klarer Kontaktablauf hatten Priorität.",
    ja: 'VFXアーティスト、Henry Claud N\'Guetta氏のためのフリーランス案件——余計な要素を排し、作品そのものを語らせることを目指しました。高速な読み込みと、シンプルな問い合わせ導線を最優先にしています。',
  },
  'project.henry.body2': {
    en: 'Built with React, Vite and SCSS with an Express/Resend contact backend, deployed on FastPanda hosting.',
    pl: 'Zbudowana w React, Vite i SCSS z backendem kontaktowym Express/Resend, wdrożona na hostingu FastPanda.',
    it: 'Realizzato con React, Vite e SCSS con un backend di contatto Express/Resend, distribuito su hosting FastPanda.',
    de: 'Entwickelt mit React, Vite und SCSS mit einem Express/Resend-Kontakt-Backend, gehostet auf FastPanda.',
    ja: 'React、Vite、SCSSで構築し、Express/Resendによる問い合わせフォームのバックエンドを備え、FastPandaでホスティングしています。',
  },
  'project.henry.shot1': {
    en: 'The landing page — full-bleed reel work up front, with nothing else competing for attention.',
    pl: 'Strona główna — pełnoekranowy showreel na pierwszym planie, bez niczego, co odwracałoby uwagę.',
    it: "La landing page — showreel a piena pagina in primo piano, senza nient'altro a competere per l'attenzione.",
    de: 'Die Landingpage — Showreel-Arbeiten randlos im Vordergrund, ohne dass etwas anderes um Aufmerksamkeit konkurriert.',
    ja: 'ランディングページ——リール映像を全画面で前面に出し、他に注意を引くものは一切置いていません。',
  },
  'project.henry.shot2': {
    en: 'A gallery of stills and behind-the-scenes shots, laid out so the work itself stays the focus rather than the interface around it.',
    pl: 'Galeria kadrów i zdjęć zza kulis, ułożona tak, by to praca pozostawała w centrum uwagi, a nie interfejs wokół niej.',
    it: "Una galleria di still e scatti dietro le quinte, organizzata in modo che il lavoro stesso resti il centro dell'attenzione, non l'interfaccia intorno.",
    de: 'Eine Galerie mit Standbildern und Behind-the-Scenes-Aufnahmen, so gestaltet, dass die Arbeit selbst im Fokus bleibt und nicht die Oberfläche drumherum.',
    ja: 'スチール写真と舞台裏のショットのギャラリー。主役はあくまで作品自体で、インターフェースが目立たないように配置しています。',
  },
  'project.henry.shot3': {
    en: 'The showreel section, built to load quickly and play cleanly without extra chrome getting in the way of the footage.',
    pl: 'Sekcja showreela, zaprojektowana tak, by szybko się ładować i płynnie odtwarzać, bez zbędnych elementów interfejsu przesłaniających materiał.',
    it: "La sezione showreel, costruita per caricarsi velocemente e riprodursi in modo pulito, senza elementi extra dell'interfaccia che ostacolino il filmato.",
    de: 'Der Showreel-Bereich, gebaut für schnelles Laden und sauberes Abspielen, ohne dass zusätzliche Bedienelemente das Material stören.',
    ja: 'ショーリールのセクション。読み込みが速く、余計なUIが映像の邪魔をしないようすっきりと再生されるよう作られています。',
  },
  'project.henry.shot4': {
    en: "A short about section — just enough context on Henry's work, kept out of the way of the portfolio itself.",
    pl: "Krótka sekcja \"o mnie\" — tyle kontekstu o pracy Henry'ego, ile potrzeba, bez zajmowania miejsca samemu portfolio.",
    it: "Una breve sezione about — giusto il contesto necessario sul lavoro di Henry, senza intralciare il portfolio stesso.",
    de: "Ein kurzer Über-mich-Bereich — gerade genug Kontext zu Henrys Arbeit, ohne dem eigentlichen Portfolio im Weg zu stehen.",
    ja: '短いアバウトセクション——Henryの作品を理解するのに必要な最低限の情報だけを載せ、ポートフォリオ本体の邪魔にならないようにしています。',
  },

  'project.synapse.tagline': {
    en: 'A sci-fi film project website exploring memory and neural technology.',
    pl: 'Strona filmowego projektu sci-fi, eksplorująca temat pamięci i technologii neuronowej.',
    it: 'Il sito di un progetto cinematografico sci-fi che esplora memoria e tecnologia neurale.',
    de: 'Die Website eines Sci-Fi-Filmprojekts, das sich mit Erinnerung und neuronaler Technologie beschäftigt.',
    ja: '記憶とニューラルテクノロジーをテーマにしたSF映画プロジェクトのウェブサイトです。',
  },
  'project.synapse.body1': {
    en: 'Synapse 2066 is a collaborative project built for promotion of a short Sci-Fi Movie experience for a sci-fi film concept exploring memory, identity and neural technology set in 2066.',
    pl: 'Synapse 2066 to wspólny projekt stworzony na potrzeby promocji krótkometrażowego filmu sci-fi, którego koncepcja eksploruje pamięć, tożsamość i technologię neuronową w świecie osadzonym w 2066 roku.',
    it: "Synapse 2066 è un progetto collaborativo realizzato per la promozione di un cortometraggio sci-fi, con un concept che esplora memoria, identità e tecnologia neurale ambientato nel 2066.",
    de: 'Synapse 2066 ist ein gemeinsames Projekt zur Promotion eines Sci-Fi-Kurzfilmerlebnisses, dessen Konzept Erinnerung, Identität und neuronale Technologie im Jahr 2066 erkundet.',
    ja: 'Synapse 2066は、2066年を舞台に記憶・アイデンティティ・ニューラルテクノロジーを描く短編SF映画のプロモーションのために制作された共同プロジェクトです。',
  },
  'project.synapse.shot1': {
    en: "The landing page for Synapse 2066 — a countdown and first look into the film's world, built to set the tone before anyone reads a word of copy.",
    pl: 'Strona główna Synapse 2066 — odliczanie i pierwsze spojrzenie na świat filmu, zaprojektowane tak, by nadać ton jeszcze zanim ktokolwiek przeczyta choć jedno zdanie.',
    it: "La landing page di Synapse 2066 — un countdown e un primo sguardo sul mondo del film, pensata per dare il tono ancora prima che si legga una sola parola di testo.",
    de: 'Die Landingpage für Synapse 2066 — ein Countdown und ein erster Blick in die Welt des Films, gestaltet, um die Stimmung zu setzen, bevor überhaupt ein Wort Text gelesen wird.',
    ja: 'Synapse 2066のランディングページ——カウントダウンと映画の世界への最初の窓口。文章を読む前から作品の雰囲気を伝えるよう設計されています。',
  },
  'project.synapse.shot2': {
    en: "A fictional in-universe corporate page, part of the film's wider marketing concept — treating the world as if the company inside it were real.",
    pl: 'Fikcyjna, osadzona w świecie filmu strona korporacyjna, będąca częścią szerszej koncepcji marketingowej — traktująca ten świat tak, jakby firma w nim istniejąca była prawdziwa.',
    it: "Una pagina aziendale fittizia interna all'universo narrativo, parte del più ampio concept di marketing del film — trattando il mondo come se l'azienda al suo interno fosse reale.",
    de: 'Eine fiktive, in der Filmwelt angesiedelte Unternehmensseite, Teil des breiteren Marketingkonzepts des Films — die Welt wird so behandelt, als wäre das Unternehmen darin real.',
    ja: '映画の世界観の中に存在する架空の企業ページ。作品全体のマーケティングコンセプトの一部として、その世界の企業が実在するかのように作り込まれています。',
  },
  'project.synapse.shot3': {
    en: 'Cast profiles for the short film, giving each performer their own moment on the site.',
    pl: 'Profile obsady krótkometrażówki, dające każdemu aktorowi własne miejsce na stronie.',
    it: 'Profili del cast del cortometraggio, che danno a ogni interprete il proprio spazio sul sito.',
    de: 'Besetzungsprofile für den Kurzfilm, die jedem Darsteller seinen eigenen Moment auf der Seite geben.',
    ja: '短編映画のキャストプロフィール。出演者一人ひとりにサイト上で個別のスペースを設けています。',
  },
  'project.synapse.shot4': {
    en: 'Behind-the-scenes crew credits and roles — the people who made the short film happen, not just the faces on screen.',
    pl: 'Kulisy produkcji, ekipa i jej role — ludzie, dzięki którym ten krótkometrażowy film powstał, nie tylko twarze na ekranie.',
    it: "Crediti e ruoli della troupe dietro le quinte — le persone che hanno reso possibile il cortometraggio, non solo i volti sullo schermo.",
    de: 'Behind-the-Scenes-Credits und Rollen der Crew — die Menschen, die den Kurzfilm möglich gemacht haben, nicht nur die Gesichter auf der Leinwand.',
    ja: '舞台裏のスタッフクレジットと役割——画面に映る顔だけでなく、短編映画を実現させた人々を紹介しています。',
  },

  'project.pyramidNull.tagline': {
    en: 'Ancient Egypt meets modern digital - an interactive app experience.',
    pl: 'Starożytny Egipt spotyka nowoczesną cyfrowość - interaktywne doświadczenie aplikacyjne.',
    it: "L'antico Egitto incontra il digitale moderno - un'esperienza app interattiva.",
    de: 'Das alte Ägypten trifft auf moderne Digitaltechnik - ein interaktives App-Erlebnis.',
    ja: '古代エジプトと現代デジタルの融合——インタラクティブなアプリ体験。',
  },

  'project.bookhouseTickets.tagline': {
    en: 'Book cinema, theatre, and nearby event tickets in one place.',
    pl: 'Rezerwuj bilety do kina, teatru i na pobliskie wydarzenia w jednym miejscu.',
    it: 'Prenota biglietti per cinema, teatro ed eventi nelle vicinanze in un unico posto.',
    de: 'Buche Kino-, Theater- und Tickets für Veranstaltungen in der Nähe an einem Ort.',
    ja: '映画、演劇、近くのイベントのチケットを一箇所でまとめて予約できます。',
  },
  'project.bookhouseTickets.body1': {
    en: 'BookHouse Tickets is a platform where people can buy tickets for cinema and theatre showings, and discover nearby events happening around them.',
    pl: 'BookHouse Tickets to platforma, na której można kupować bilety na seanse kinowe i spektakle teatralne oraz odkrywać pobliskie wydarzenia dziejące się w okolicy.',
    it: 'BookHouse Tickets è una piattaforma dove le persone possono acquistare biglietti per proiezioni cinematografiche e spettacoli teatrali, e scoprire eventi nelle vicinanze.',
    de: 'BookHouse Tickets ist eine Plattform, auf der man Tickets für Kino- und Theatervorstellungen kaufen und Veranstaltungen in der Nähe entdecken kann.',
    ja: 'BookHouse Ticketsは、映画館や劇場の上映・公演チケットを購入し、近くで開催されるイベントを見つけられるプラットフォームです。',
  },
  'project.bookhouseTickets.body2': {
    en: 'Built with PHP on the backend and HTML, JavaScript and SASS on the frontend, covering browsing and searching listings, seat/ticket purchase flows, and location-based event discovery.',
    pl: 'Zbudowana z użyciem PHP na backendzie oraz HTML, JavaScript i SASS na frontendzie, obejmująca przeglądanie i wyszukiwanie ofert, procesy zakupu miejsc/biletów oraz odkrywanie wydarzeń na podstawie lokalizacji.',
    it: 'Realizzata con PHP sul backend e HTML, JavaScript e SASS sul frontend, copre la navigazione e ricerca degli annunci, i flussi di acquisto di posti/biglietti e la scoperta di eventi basata sulla posizione.',
    de: 'Entwickelt mit PHP im Backend und HTML, JavaScript und SASS im Frontend, deckt das Durchsuchen und Suchen von Angeboten, Sitzplatz-/Ticketkauf-Abläufe und standortbasierte Veranstaltungsentdeckung ab.',
    ja: 'バックエンドはPHP、フロントエンドはHTML、JavaScript、SASSで構築。リスティングの閲覧・検索、座席/チケット購入フロー、位置情報に基づくイベント発見に対応しています。',
  },
  'project.bookhouseTickets.shot1': {
    en: 'Account registration for booking tickets — a quick sign-up before browsing showings.',
    pl: 'Rejestracja konta do rezerwacji biletów — szybki proces zakładania konta przed przeglądaniem seansów.',
    it: "Registrazione dell'account per prenotare biglietti — un'iscrizione rapida prima di sfogliare le proiezioni.",
    de: 'Kontoregistrierung für die Ticketbuchung — eine schnelle Anmeldung, bevor man Vorstellungen durchstöbert.',
    ja: 'チケット予約のためのアカウント登録——上映情報を見る前の簡単なサインアップです。',
  },
  'project.bookhouseTickets.shot2': {
    en: 'A separate registration flow for venues and event organisers, so cinemas and theatres can list their own showings directly.',
    pl: 'Osobny proces rejestracji dla obiektów i organizatorów wydarzeń, dzięki któremu kina i teatry mogą samodzielnie dodawać własne seanse.',
    it: 'Un flusso di registrazione separato per locali e organizzatori di eventi, così cinema e teatri possono elencare direttamente le proprie proiezioni.',
    de: 'Ein separater Registrierungsablauf für Veranstaltungsorte und Event-Organisatoren, damit Kinos und Theater ihre eigenen Vorstellungen direkt einstellen können.',
    ja: '会場やイベント主催者向けの専用登録フロー。映画館や劇場が自分たちの上映情報を直接掲載できます。',
  },
  'project.bookhouseTickets.shot3': {
    en: 'Browsing cinema and theatre listings from the home screen, with search built in to narrow things down fast.',
    pl: 'Przeglądanie ofert kin i teatrów z poziomu ekranu głównego, z wbudowaną wyszukiwarką pozwalającą szybko zawęzić wyniki.',
    it: 'Sfogliare gli elenchi di cinema e teatri dalla schermata principale, con una ricerca integrata per restringere velocemente i risultati.',
    de: 'Durchstöbern von Kino- und Theaterangeboten vom Startbildschirm aus, mit integrierter Suche, um die Auswahl schnell einzugrenzen.',
    ja: 'ホーム画面から映画館・劇場の上映情報を閲覧。検索機能で素早く絞り込みができます。',
  },
  'project.bookhouseTickets.shot4': {
    en: 'PLACEHOLDER — replace with what this screen actually shows (e.g. seat selection, event details, or nearby event discovery).',
    pl: 'ZASTĘPCZY TEKST — zastąp opisem tego, co faktycznie pokazuje ten ekran (np. wybór miejsc, szczegóły wydarzenia lub wyszukiwanie pobliskich wydarzeń).',
    it: 'SEGNAPOSTO — sostituisci con ciò che questa schermata mostra realmente (es. selezione posti, dettagli evento o scoperta di eventi nelle vicinanze).',
    de: 'PLATZHALTER — durch eine Beschreibung ersetzen, was dieser Bildschirm tatsächlich zeigt (z. B. Sitzplatzauswahl, Veranstaltungsdetails oder Entdeckung von Events in der Nähe).',
    ja: 'プレースホルダー——この画面が実際に何を表示しているか（座席選択、イベント詳細、近くのイベント検索など）に置き換えてください。',
  },
  'contact.mail.errorRequired': {
    en: 'This field is required.',
    pl: 'To pole jest wymagane.',
    it: 'Questo campo è obbligatorio.',
    de: 'Dieses Feld ist erforderlich.',
    ja: 'この項目は必須です。',
  },
  'contact.mail.errorEmailInvalid': {
    en: "That email doesn't look right.",
    pl: 'Ten adres e-mail nie wygląda poprawnie.',
    it: 'Questa email non sembra corretta.',
    de: 'Diese E-Mail-Adresse sieht nicht richtig aus.',
    ja: 'メールアドレスの形式が正しくないようです。',
  },
  'contact.mail.errorMessageShort': {
    en: 'Just a bit more detail would help!',
    pl: 'Przydałoby się trochę więcej szczegółów!',
    it: "Un po' più di dettagli aiuterebbero!",
    de: 'Ein paar mehr Details wären hilfreich!',
    ja: 'もう少し詳しく書いていただけると助かります！',
  },
  'contact.mail.errorAttachmentSize': {
    en: 'That file is a bit too large (max 5MB).',
    pl: 'Ten plik jest zbyt duży (maks. 5 MB).',
    it: 'Questo file è troppo grande (max 5MB).',
    de: 'Diese Datei ist etwas zu groß (max. 5 MB).',
    ja: 'ファイルサイズが大きすぎます（最大5MB）。',
  },
  'contact.mail.errorAttachmentRead': {
    en: "Couldn't read that file — try a different one?",
    pl: 'Nie udało się odczytać tego pliku — spróbuj innego?',
    it: 'Impossibile leggere questo file — provane un altro?',
    de: 'Diese Datei konnte nicht gelesen werden — versuche eine andere?',
    ja: 'ファイルを読み込めませんでした——別のファイルをお試しください。',
  },
  'contact.mail.errorGeneric': {
    en: 'Something went wrong sending your message. Please try again, or email hello@codedbyklaudia.co.uk directly.',
    pl: 'Coś poszło nie tak przy wysyłaniu wiadomości. Spróbuj ponownie lub napisz bezpośrednio na hello@codedbyklaudia.co.uk.',
    it: "Si è verificato un problema nell'invio del messaggio. Riprova, oppure scrivi direttamente a hello@codedbyklaudia.co.uk.",
    de: 'Beim Senden deiner Nachricht ist etwas schiefgelaufen. Bitte versuche es erneut oder schreibe direkt an hello@codedbyklaudia.co.uk.',
    ja: 'メッセージの送信中に問題が発生しました。もう一度お試しいただくか、hello@codedbyklaudia.co.uk まで直接ご連絡ください。',
  },

  'contact.kicker': {
    en: 'Get in touch',
    pl: 'Skontaktuj się',
    it: 'Mettiti in contatto',
    de: 'Kontakt aufnehmen',
    ja: 'お問い合わせ',
  },
  'contact.tagline': {
    en: "Have a project in mind, a question, or just want to say hi? Drop me a message and I'll get back to you as soon as I can.",
    pl: 'Masz pomysł na projekt, pytanie, a może po prostu chcesz się przywitać? Napisz do mnie, a odezwę się najszybciej jak to możliwe.',
    it: 'Hai un progetto in mente, una domanda, o vuoi solo salutarmi? Scrivimi un messaggio e ti risponderò il prima possibile.',
    de: 'Hast du ein Projekt im Kopf, eine Frage, oder möchtest einfach Hallo sagen? Schreib mir eine Nachricht, ich melde mich so schnell wie möglich.',
    ja: 'プロジェクトのご相談、ご質問、あるいはちょっとした挨拶でも構いません。メッセージをいただければ、できるだけ早くお返事します。',
},
'contact.mail.close': {
    en: 'Close',
    pl: 'Zamknij',
    it: 'Chiudi',
    de: 'Schließen',
    ja: '閉じる',
  },
   'contact.hero.available': {
    en: 'Available for new projects',
    pl: 'Dostępna do nowych projektów',
    it: 'Disponibile per nuovi progetti',
    de: 'Verfügbar für neue Projekte',
    ja: '新しいプロジェクト受付中',
  },
  'contact.dock.email': {
    en: 'Email',
    pl: 'E-mail',
    it: 'Email',
    de: 'E-Mail',
    ja: 'メール',
  },
  'contact.dock.call': {
    en: 'Call',
    pl: 'Zadzwoń',
    it: 'Chiama',
    de: 'Anrufen',
    ja: '電話',
  },

  // ═════════ Loader, lock screen, projects and more ═════════


  // Loading screen ─────────
  'loader.starting': { en: 'Starting up', pl: 'Uruchamianie', it: 'Avvio in corso', de: 'Wird gestartet', ja: '起動中' },
  'loader.fonts':    { en: 'Loading fonts', pl: 'Ładowanie czcionek', it: 'Caricamento dei font', de: 'Schriften werden geladen', ja: 'フォントを読み込み中' },
  'loader.images':   { en: 'Loading images', pl: 'Ładowanie obrazów', it: 'Caricamento delle immagini', de: 'Bilder werden geladen', ja: '画像を読み込み中' },
  'loader.opening':  { en: 'Opening desktop', pl: 'Otwieranie pulpitu', it: 'Apertura del desktop', de: 'Desktop wird geöffnet', ja: 'デスクトップを開いています' },

  // ───────── Lock screen ─────────
  'hero.dictWord': { en: 'software developer', pl: 'programistka', it: 'sviluppatrice software', de: 'Softwareentwicklerin', ja: 'ソフトウェア開発者' },
  'hero.dictPron': {
    en: '/ˈsɒft.weə dɪˈvel.ə.pər/',
    pl: '/prɔɡraˈmistka/',
    it: '/zvilupːaˈtriːtʃe ˈsɔftwɛr/',
    de: '/ˈzɔftvɛːɐ̯ ʔɛntˈvɪklɐʁɪn/',
    ja: 'そふとうぇあ かいはつしゃ',
  },
  'hero.dictPos': { en: 'noun', pl: 'rzeczownik', it: 'sostantivo', de: 'Substantiv', ja: '名詞' },
  'hero.dictDef': {
    en: 'a digital wizard who turns caffeine into code, transforms bugs into features, and sometimes speaks in a secret language only computers understand. They make your apps work like magic… most of the time.',
    pl: 'cyfrowa czarodziejka, która zamienia kofeinę w kod, przemienia błędy w funkcje i czasem mówi tajnym językiem, który rozumieją tylko komputery. To dzięki niej twoje aplikacje działają jak magia… przez większość czasu.',
    it: 'una maga digitale che trasforma la caffeina in codice, i bug in funzionalità e che a volte parla una lingua segreta che solo i computer capiscono. Fa funzionare le tue app come per magia… quasi sempre.',
    de: 'eine digitale Zauberin, die Koffein in Code verwandelt, Bugs in Features umwandelt und manchmal in einer geheimen Sprache spricht, die nur Computer verstehen. Sie lässt deine Apps wie von Zauberhand laufen … meistens jedenfalls.',
    ja: 'カフェインをコードに変え、バグを機能に変え、ときにはコンピューターだけが理解する秘密の言語を話すデジタルの魔法使い。あなたのアプリを魔法のように動かします……たいていは。',
  },

  // ───────── Desktop: Toolbox and CV ─────────
  'hero.toolbox': { en: 'Toolbox', pl: 'Narzędzia', it: 'Strumenti', de: 'Werkzeugkasten', ja: 'ツールボックス' },
  'hero.toolboxLanguages': { en: 'Languages', pl: 'Języki programowania', it: 'Linguaggi', de: 'Programmiersprachen', ja: 'プログラミング言語' },
  'hero.toolboxSoftware': { en: 'Software', pl: 'Oprogramowanie', it: 'Software', de: 'Software', ja: 'ソフトウェア' },
  'hero.cv': { en: 'CV.pdf', pl: 'CV.pdf', it: 'CV.pdf', de: 'Lebenslauf.pdf', ja: '履歴書.pdf' },
  'hero.cvDownload': { en: 'Download CV', pl: 'Pobierz CV', it: 'Scarica il CV', de: 'Lebenslauf herunterladen', ja: '履歴書をダウンロード' },
  'skills.stripLabel': { en: 'Tools I work with', pl: 'Narzędzia, z których korzystam', it: 'Strumenti con cui lavoro', de: 'Tools, mit denen ich arbeite', ja: '使っているツール' },

  // ───────── Projects section ─────────
  // the title comes in two parts: the second one is set in italic
  'projects.title': { en: 'Things I’ve', pl: 'Rzeczy, które', it: 'Cose che ho', de: 'Was ich so', ja: 'これまでに' },
  'projects.titleEnd': { en: 'cooked up.', pl: 'upichciłam.', it: 'combinato.', de: 'gezaubert habe.', ja: 'つくったもの。' },
  'projects.lead': {
    en: 'Apps, websites and a few happy accidents, built with too much coffee and just enough patience. Open a folder and have a snoop.',
    pl: 'Aplikacje, strony i kilka szczęśliwych przypadków, zrobione z nadmiarem kawy i odrobiną cierpliwości. Otwórz folder i rozejrzyj się.',
    it: 'App, siti web e qualche felice incidente, fatti con troppo caffè e la giusta dose di pazienza. Apri una cartella e curiosa pure.',
    de: 'Apps, Websites und ein paar glückliche Zufälle, gebaut mit zu viel Kaffee und gerade genug Geduld. Öffne einen Ordner und stöbere ein bisschen.',
    ja: 'アプリ、ウェブサイト、そしていくつかの嬉しいハプニング。たっぷりのコーヒーとほどよい根気でつくりました。フォルダを開いて、のぞいてみてね。',
  },
  'projects.windowTitle': { en: 'Projects', pl: 'Projekty', it: 'Progetti', de: 'Projekte', ja: 'プロジェクト' },
  'projects.favourites': { en: 'Favourites', pl: 'Ulubione', it: 'Preferiti', de: 'Favoriten', ja: 'お気に入り' },
  'projects.all': { en: 'All Projects', pl: 'Wszystkie projekty', it: 'Tutti i progetti', de: 'Alle Projekte', ja: 'すべてのプロジェクト' },
  'projects.web': { en: 'Web', pl: 'Web', it: 'Web', de: 'Web', ja: 'ウェブ' },
  'projects.apps': { en: 'Apps', pl: 'Aplikacje', it: 'App', de: 'Apps', ja: 'アプリ' },
  'projects.collab': { en: 'Collaborative', pl: 'Zespołowe', it: 'Collaborativi', de: 'Gemeinsam', ja: '共同制作' },
  'projects.open': { en: 'Open project', pl: 'Otwórz projekt', it: 'Apri progetto', de: 'Projekt öffnen', ja: 'プロジェクトを開く' },
  'projects.itemsLabel': { en: 'Items', pl: 'Elementy', it: 'Elementi', de: 'Objekte', ja: '項目' },

  // ───────── Project page ─────────
  'project.back': { en: 'Back', pl: 'Wstecz', it: 'Indietro', de: 'Zurück', ja: '戻る' },
  'project.backHome': { en: 'Back home', pl: 'Wróć na stronę główną', it: 'Torna alla home', de: 'Zurück zur Startseite', ja: 'ホームに戻る' },
  'project.notFound': { en: 'Project not found.', pl: 'Nie znaleziono projektu.', it: 'Progetto non trovato.', de: 'Projekt nicht gefunden.', ja: 'プロジェクトが見つかりません。' },
  'project.viewLive': { en: 'View live', pl: 'Zobacz na żywo', it: 'Vai al sito', de: 'Live ansehen', ja: 'サイトを見る' },
  'project.openPreview': { en: 'Open preview', pl: 'Otwórz podgląd', it: 'Apri anteprima', de: 'Vorschau öffnen', ja: 'プレビューを開く' },
  'project.builtWith': { en: 'Built with', pl: 'Użyte technologie', it: 'Realizzato con', de: 'Entwickelt mit', ja: '使用技術' },
  'project.role': { en: 'Role', pl: 'Rola', it: 'Ruolo', de: 'Rolle', ja: '役割' },
  'project.with': { en: 'With', pl: 'Razem z', it: 'Insieme a', de: 'Gemeinsam mit', ja: '共同制作者' },
  'project.previous': { en: 'Previous', pl: 'Poprzedni', it: 'Precedente', de: 'Vorheriges', ja: '前へ' },
  'project.next': { en: 'Next', pl: 'Następny', it: 'Successivo', de: 'Nächstes', ja: '次へ' },
  'project.challengeLabel': { en: 'The challenge', pl: 'Wyzwanie', it: 'La sfida', de: 'Die Herausforderung', ja: '課題' },
  'project.learnedLabel': { en: 'What I learned', pl: 'Czego się nauczyłam', it: 'Cosa ho imparato', de: 'Was ich gelernt habe', ja: '学んだこと' },

  // ───────── Project page: BarkBuddy App ─────────
  'project.barkbuddyAndroid.challenge': {
    en: "Building a full native Android app on my own, from the first sketch to a working product, as my BSc final project. A lot of different pieces had to work together: a Node.js backend, real-time chat over Socket.io, push notifications through Firebase, Google Maps, an AI assistant and a local database for offline use.\n\nKeeping all of that reliable on a real phone, and keeping the app responsive while it talks to the server, was the hardest part.",
    pl: "Samodzielne zbudowanie pełnej, natywnej aplikacji na Androida, od pierwszego szkicu po działający produkt, jako mojej pracy dyplomowej BSc. Wiele różnych elementów musiało ze sobą współpracować: backend w Node.js, czat w czasie rzeczywistym przez Socket.io, powiadomienia push przez Firebase, Mapy Google, asystent AI i lokalna baza danych do użytku offline.\n\nNajtrudniejsze było sprawienie, by to wszystko działało niezawodnie na prawdziwym telefonie, a aplikacja pozostawała responsywna podczas komunikacji z serwerem.",
    it: "Costruire da sola un'app Android nativa completa, dal primo schizzo a un prodotto funzionante, come progetto finale della mia laurea BSc. Tanti elementi diversi dovevano funzionare insieme: un backend Node.js, chat in tempo reale con Socket.io, notifiche push tramite Firebase, Google Maps, un assistente AI e un database locale per l'uso offline.\n\nMantenere tutto affidabile su un telefono reale, e l'app reattiva mentre comunica con il server, è stata la parte più difficile.",
    de: "Eine vollständige native Android-App allein zu entwickeln, vom ersten Entwurf bis zum funktionierenden Produkt, als mein BSc-Abschlussprojekt. Viele verschiedene Bausteine mussten zusammenspielen: ein Node.js-Backend, Echtzeit-Chat über Socket.io, Push-Benachrichtigungen über Firebase, Google Maps, ein KI-Assistent und eine lokale Datenbank für die Offline-Nutzung.\n\nAlles auf einem echten Smartphone zuverlässig zum Laufen zu bringen und die App reaktionsschnell zu halten, während sie mit dem Server spricht, war der schwierigste Teil.",
    ja: "BScの卒業制作として、最初のスケッチから動くプロダクトまで、ネイティブAndroidアプリを一人で作り上げること。Node.jsのバックエンド、Socket.ioによるリアルタイムチャット、Firebaseを使ったプッシュ通知、Googleマップ、AIアシスタント、オフライン用のローカルデータベースなど、さまざまな要素を連携させる必要がありました。\n\nそのすべてを実機で安定して動かし、サーバーと通信しながらもアプリの反応を軽く保つことが、いちばん大変でした。",
  },
  'project.barkbuddyAndroid.learned': {
    en: "How to plan an app as a whole before writing it: which data lives on the phone (Room and DataStore), which lives on the server, and how the app should behave on a poor connection.\n\nI also learned how much time testing on a real device saves, and that a clean API is worth getting right early, because the web version uses the same backend.",
    pl: "Jak zaplanować aplikację jako całość, zanim zacznie się ją pisać: jakie dane żyją w telefonie (Room i DataStore), jakie na serwerze i jak aplikacja powinna zachowywać się przy słabym połączeniu.\n\nNauczyłam się też, ile czasu oszczędza testowanie na prawdziwym urządzeniu i że warto od początku porządnie zaprojektować API, bo korzysta z niego również wersja webowa.",
    it: "Come pianificare un'app nel suo insieme prima di scriverla: quali dati vivono sul telefono (Room e DataStore), quali sul server e come l'app deve comportarsi con una connessione debole.\n\nHo imparato anche quanto tempo fa risparmiare testare su un dispositivo reale e che vale la pena curare bene l'API fin dall'inizio, perché la versione web usa lo stesso backend.",
    de: "Wie man eine App als Ganzes plant, bevor man sie schreibt: welche Daten auf dem Handy liegen (Room und DataStore), welche auf dem Server und wie sich die App bei schlechter Verbindung verhalten soll.\n\nAußerdem habe ich gelernt, wie viel Zeit das Testen auf einem echten Gerät spart und dass es sich lohnt, die API früh sauber aufzusetzen, weil die Web-Version dasselbe Backend nutzt.",
    ja: "アプリを書き始める前に全体を設計する方法——どのデータを端末に置き（RoomとDataStore）、どれをサーバーに置くか、そして電波が悪いときにアプリがどう振る舞うべきか。\n\n実機でのテストがどれだけ時間の節約になるか、そしてWeb版も同じバックエンドを使うため、APIを最初にきちんと作る価値があることも学びました。",
  },

  // ───────── Project page: BarkBuddy Web ─────────
  'project.barkbuddyWeb.shot1': {
    en: "The home page. Everything a dog parent needs in one place: care, services and travel, with quick links to the service finder and the travel guide.",
    pl: "Strona główna. Wszystko, czego potrzebuje opiekun psa, w jednym miejscu: opieka, usługi i podróże, z szybkimi linkami do wyszukiwarki usług i przewodnika podróży.",
    it: "La home page. Tutto ciò che serve a chi ha un cane, in un unico posto: cura, servizi e viaggi, con link rapidi alla ricerca servizi e alla guida di viaggio.",
    de: "Die Startseite. Alles, was Hundeeltern brauchen, an einem Ort: Pflege, Dienstleistungen und Reisen, mit schnellen Links zur Dienstleistungssuche und zum Reiseführer.",
    ja: "ホームページ。ケア、サービス、旅行など、犬の飼い主に必要なものがひとつにまとまっています。サービス検索と旅行ガイドへもすぐにアクセスできます。",
  },
  'project.barkbuddyWeb.shot2': {
    en: "Signing up, one friendly step at a time. Here you add your dog's name and breed, and a “Did you know?” card shares a fun fact about the breed you picked.",
    pl: "Rejestracja krok po kroku, w przyjaznym stylu. Tutaj podajesz imię i rasę psa, a karta „Czy wiesz, że?” podpowiada ciekawostkę o wybranej rasie.",
    it: "La registrazione, un passo alla volta. Qui inserisci il nome e la razza del tuo cane, e una scheda “Lo sapevi?” racconta una curiosità sulla razza scelta.",
    de: "Die Registrierung, Schritt für Schritt. Hier gibst du Namen und Rasse deines Hundes ein, und eine „Wusstest du schon?“-Karte verrät eine lustige Tatsache über die gewählte Rasse.",
    ja: "登録はひとつずつ、やさしいステップで。ここでは犬の名前と犬種を入力します。「知ってた？」カードが、選んだ犬種の豆知識を教えてくれます。",
  },
  'project.barkbuddyWeb.shot3': {
    en: "Your dog's profile: name, breed, age in human years and favourite things, with a link to share the profile with friends and family.",
    pl: "Profil psa: imię, rasa, wiek w ludzkich latach i ulubione rzeczy, a do tego link, by udostępnić profil znajomym i rodzinie.",
    it: "Il profilo del cane: nome, razza, età in anni umani e cose preferite, con un link per condividere il profilo con amici e famiglia.",
    de: "Das Profil deines Hundes: Name, Rasse, Alter in Menschenjahren und Lieblingsdinge, mit einem Link, um das Profil mit Freunden und Familie zu teilen.",
    ja: "愛犬のプロフィール。名前、犬種、人間に換算した年齢、好きなことを表示し、リンクで家族や友だちにシェアすることもできます。",
  },
  'project.barkbuddyWeb.shot4': {
    en: "The health calendar keeps track of vaccines, treatments and appointments, colour-coded so you can see at a glance what's overdue, due soon or done.",
    pl: "Kalendarz zdrowia śledzi szczepienia, zabiegi i wizyty, z oznaczeniami kolorami, dzięki którym od razu widać, co jest zaległe, co zbliża się wkrótce, a co już zrobione.",
    it: "Il calendario della salute tiene traccia di vaccini, trattamenti e appuntamenti, con colori diversi per vedere subito cosa è scaduto, cosa è in arrivo e cosa è già fatto.",
    de: "Der Gesundheitskalender behält Impfungen, Behandlungen und Termine im Blick, farblich markiert, damit du sofort siehst, was überfällig, bald fällig oder erledigt ist.",
    ja: "健康カレンダーで、ワクチン、治療、予約を管理。色分けされているので、期限切れ、もうすぐ、完了がひと目でわかります。",
  },
  'project.barkbuddyWeb.shot5': {
    en: "Adding a health event: pick a type, like a vaccine, flea and tick treatment or a vet appointment, set the due date and add notes if you need them.",
    pl: "Dodawanie wydarzenia zdrowotnego: wybierz rodzaj, na przykład szczepienie, ochronę przed pchłami i kleszczami albo wizytę u weterynarza, ustaw termin i w razie potrzeby dodaj notatki.",
    it: "Aggiungere un evento sanitario: scegli il tipo, come un vaccino, un trattamento antipulci e zecche o una visita dal veterinario, imposta la scadenza e aggiungi note se servono.",
    de: "Ein Gesundheitsereignis hinzufügen: Wähle eine Art, etwa eine Impfung, eine Floh- und Zeckenbehandlung oder einen Tierarzttermin, lege das Fälligkeitsdatum fest und füge bei Bedarf Notizen hinzu.",
    ja: "健康イベントの追加。ワクチン、ノミ・ダニ対策、動物病院の予約などから種類を選び、期日を設定して、必要ならメモを書き添えます。",
  },
  'project.barkbuddyWeb.shot6': {
    en: "The service finder: search for vets, groomers and pet shops near you, and see every result on a Google Map.",
    pl: "Wyszukiwarka usług: znajdź weterynarzy, groomerów i sklepy zoologiczne w pobliżu i zobacz wszystkie wyniki na Mapie Google.",
    it: "La ricerca servizi: trova veterinari, toelettatori e negozi per animali vicino a te, e vedi ogni risultato su Google Maps.",
    de: "Die Dienstleistungssuche: Finde Tierärzte, Hundefriseure und Tierhandlungen in deiner Nähe und sieh alle Ergebnisse auf Google Maps.",
    ja: "サービス検索。近くの動物病院、トリマー、ペットショップを探して、すべての結果をGoogleマップで確認できます。",
  },
  'project.barkbuddyWeb.shot7': {
    en: "The travel guide starts with a simple question: which continent are you going to? Six steps then take you all the way to a checklist you can download.",
    pl: "Przewodnik podróży zaczyna się od prostego pytania: na jaki kontynent jedziesz? Sześć kroków prowadzi cię aż do checklisty, którą możesz pobrać.",
    it: "La guida di viaggio parte da una domanda semplice: in quale continente vai? Sei passaggi ti portano fino a una checklist da scaricare.",
    de: "Der Reiseführer beginnt mit einer einfachen Frage: Auf welchen Kontinent geht es? Sechs Schritte führen dich dann bis zu einer Checkliste zum Herunterladen.",
    ja: "旅行ガイドは「どの大陸へ行きますか？」というシンプルな質問から始まります。6つのステップで、ダウンロードできるチェックリストまで案内します。",
  },
  'project.barkbuddyWeb.shot8': {
    en: "Every country has its own requirements, like a microchip, shown one card at a time so nothing gets missed before the trip.",
    pl: "Każdy kraj ma własne wymagania, na przykład mikroczip, pokazane po jednej karcie naraz, by przed podróżą nic nie umknęło.",
    it: "Ogni paese ha i suoi requisiti, come il microchip, mostrati una scheda alla volta, così non si dimentica nulla prima del viaggio.",
    de: "Jedes Land hat eigene Anforderungen, etwa einen Mikrochip, die Karte für Karte angezeigt werden, damit vor der Reise nichts vergessen wird.",
    ja: "マイクロチップなど、国ごとに異なる条件を1枚ずつカードで表示。出発前に見落としがないようにします。",
  },
  'project.barkbuddyWeb.challenge': {
    en: "Building a second platform on top of the first one's backend. The website had to speak the same API as the Android app, while adding features that suit a bigger screen: a service finder with Google Maps, a multi-step trip planner with PDF export, a community forum and a dashboard for businesses.\n\nMaking that many features feel like one consistent product was the main challenge.",
    pl: "Zbudowanie drugiej platformy na backendzie pierwszej. Strona musiała korzystać z tego samego API co aplikacja na Androida, a jednocześnie oferować funkcje pasujące do większego ekranu: wyszukiwarkę usług z Mapami Google, wieloetapowy planer podróży z eksportem do PDF, forum społecznościowe i panel dla firm.\n\nGłównym wyzwaniem było sprawienie, by tak wiele funkcji tworzyło jeden spójny produkt.",
    it: "Costruire una seconda piattaforma sopra il backend della prima. Il sito doveva parlare la stessa API dell'app Android, aggiungendo funzionalità adatte a uno schermo più grande: un motore di ricerca servizi con Google Maps, un pianificatore di viaggio a più fasi con esportazione PDF, un forum della community e una dashboard per le aziende.\n\nFar sentire così tante funzionalità come un unico prodotto coerente è stata la sfida principale.",
    de: "Eine zweite Plattform auf dem Backend der ersten aufzubauen. Die Website musste dieselbe API wie die Android-App nutzen und zugleich Funktionen bieten, die zu einem größeren Bildschirm passen: eine Dienstleistungssuche mit Google Maps, einen mehrstufigen Reiseplaner mit PDF-Export, ein Community-Forum und ein Dashboard für Unternehmen.\n\nSo viele Funktionen wie ein einheitliches Produkt wirken zu lassen, war die größte Herausforderung.",
    ja: "最初のアプリのバックエンドの上に、2つ目のプラットフォームを作ること。Webサイトは、Androidアプリと同じAPIを使いながら、大きな画面に合った機能——Googleマップ連携のサービス検索、PDF出力付きの複数ステップ旅行プランナー、コミュニティフォーラム、事業者向けダッシュボード——を加える必要がありました。\n\nこれだけ多くの機能を、ひとつの一貫したプロダクトに感じさせることが最大の課題でした。",
  },
  'project.barkbuddyWeb.learned': {
    en: "How to design a backend that serves two very different apps, and how much TypeScript helps by catching mistakes before users do.\n\nI also learned how to host a real project from end to end: a PostgreSQL database on Neon, the server on Render, and image uploads through Cloudinary.",
    pl: "Jak zaprojektować backend obsługujący dwie bardzo różne aplikacje i jak bardzo TypeScript pomaga, wyłapując błędy, zanim zrobią to użytkownicy.\n\nNauczyłam się też hostować prawdziwy projekt od początku do końca: baza PostgreSQL na Neon, serwer na Render i przesyłanie obrazów przez Cloudinary.",
    it: "Come progettare un backend che serve due app molto diverse e quanto TypeScript aiuti a intercettare gli errori prima degli utenti.\n\nHo imparato anche a mettere online un progetto reale da cima a fondo: un database PostgreSQL su Neon, il server su Render e il caricamento delle immagini tramite Cloudinary.",
    de: "Wie man ein Backend entwirft, das zwei sehr unterschiedliche Apps bedient, und wie sehr TypeScript hilft, Fehler zu finden, bevor es die Nutzer tun.\n\nAußerdem habe ich gelernt, ein echtes Projekt von Anfang bis Ende zu hosten: eine PostgreSQL-Datenbank bei Neon, den Server bei Render und Bild-Uploads über Cloudinary.",
    ja: "まったく性格の異なる2つのアプリを支えるバックエンドの設計方法と、ユーザーより先にTypeScriptがミスを見つけてくれることのありがたさ。\n\n本番のプロジェクトを最初から最後まで公開する方法も身につきました。NeonのPostgreSQL、Renderのサーバー、Cloudinaryによる画像アップロードです。",
  },

  // ───────── Project page: Henry N'Guetta ─────────
  'project.henry.challenge': {
    en: "A real client with real expectations: a portfolio that had to look polished, load quickly and let visitors get in touch without any friction.\n\nBalancing a design-heavy site with performance, and making the contact form deliver messages reliably, took the most care.",
    pl: "Prawdziwy klient z prawdziwymi oczekiwaniami: portfolio, które miało wyglądać dopracowanie, szybko się ładować i pozwalać odwiedzającym skontaktować się bez żadnych przeszkód.\n\nNajwięcej uwagi wymagało pogodzenie mocno zaprojektowanej strony z wydajnością oraz sprawienie, by formularz kontaktowy niezawodnie dostarczał wiadomości.",
    it: "Un cliente vero con aspettative vere: un portfolio che doveva essere curato, caricarsi in fretta e permettere ai visitatori di mettersi in contatto senza attriti.\n\nBilanciare un sito ricco di design con le prestazioni e far sì che il modulo di contatto recapitasse i messaggi in modo affidabile è ciò che ha richiesto più attenzione.",
    de: "Ein echter Kunde mit echten Erwartungen: ein Portfolio, das hochwertig aussehen, schnell laden und Besuchern eine reibungslose Kontaktaufnahme ermöglichen sollte.\n\nAm meisten Sorgfalt erforderte es, eine designlastige Seite mit guter Performance in Einklang zu bringen und dafür zu sorgen, dass das Kontaktformular Nachrichten zuverlässig zustellt.",
    ja: "本物のクライアントと本物の期待——洗練された見た目で、素早く読み込まれ、訪問者がスムーズに連絡できるポートフォリオであること。\n\nデザイン性の高いサイトとパフォーマンスの両立、そして問い合わせフォームのメッセージを確実に届けることに、最も気を配りました。",
  },
  'project.henry.learned': {
    en: "How to work with a client: turning feedback into decisions and keeping the scope under control.\n\nOn the technical side, I learned how much images and animations affect loading time, and how to set up a contact form that really sends email (Express and Resend) and reaches the inbox.",
    pl: "Jak pracować z klientem: zamieniać uwagi w decyzje i trzymać zakres prac pod kontrolą.\n\nOd strony technicznej nauczyłam się, jak mocno obrazy i animacje wpływają na czas ładowania oraz jak skonfigurować formularz kontaktowy, który naprawdę wysyła e-maile (Express i Resend) i trafia do skrzynki odbiorczej.",
    it: "Come lavorare con un cliente: trasformare i feedback in decisioni e tenere sotto controllo l'ambito del lavoro.\n\nSul piano tecnico ho imparato quanto le immagini e le animazioni incidano sui tempi di caricamento e come configurare un modulo di contatto che invii davvero le email (Express e Resend) e arrivi nella posta in arrivo.",
    de: "Wie man mit einem Kunden arbeitet: Feedback in Entscheidungen verwandeln und den Umfang im Griff behalten.\n\nTechnisch habe ich gelernt, wie stark Bilder und Animationen die Ladezeit beeinflussen und wie man ein Kontaktformular einrichtet, das wirklich E-Mails verschickt (Express und Resend) und im Posteingang ankommt.",
    ja: "クライアントとの仕事の進め方——フィードバックを意思決定に変え、スコープをコントロールすること。\n\n技術面では、画像やアニメーションが読み込み時間にどれほど影響するか、そして実際にメールを送信して受信トレイに届く問い合わせフォーム（ExpressとResend）の作り方を学びました。",
  },

  // ───────── Project page: Synapse 2066 ─────────
  'project.synapse.challenge': {
    en: "A team project with a deadline, where I was both a developer and the Scrum Master. The challenge was as much about people as about code: splitting the work so three developers could build at the same time without overwriting each other, and keeping the style and quality consistent across the whole site.",
    pl: "Projekt zespołowy z terminem, w którym byłam jednocześnie programistką i Scrum Masterem. Wyzwanie dotyczyło tyle samo ludzi, co kodu: podziału pracy tak, by troje programistów mogło tworzyć jednocześnie bez nadpisywania swoich zmian, oraz utrzymania spójnego stylu i jakości na całej stronie.",
    it: "Un progetto di gruppo con una scadenza, in cui ero sia sviluppatrice sia Scrum Master. La sfida riguardava tanto le persone quanto il codice: dividere il lavoro in modo che tre sviluppatori potessero lavorare in contemporanea senza sovrascriversi a vicenda, e mantenere stile e qualità coerenti su tutto il sito.",
    de: "Ein Teamprojekt mit Deadline, bei dem ich gleichzeitig Entwicklerin und Scrum Master war. Die Herausforderung hatte ebenso viel mit Menschen wie mit Code zu tun: die Arbeit so aufzuteilen, dass drei Entwickler gleichzeitig arbeiten konnten, ohne sich gegenseitig zu überschreiben, und Stil und Qualität auf der ganzen Seite einheitlich zu halten.",
    ja: "締め切りのあるチームプロジェクトで、私は開発者とスクラムマスターの両方を務めました。課題はコードと同じくらい人に関するものでした——3人の開発者が互いの変更を上書きせずに同時に作業できるよう作業を分け、サイト全体でスタイルと品質を揃えることです。",
  },
  'project.synapse.learned': {
    en: "How to run a small team with Scrum: planning sprints, keeping the board honest and making decisions together.\n\nI also got much better at using Git as a team, with branches, pull requests and merge conflicts, and at giving and receiving feedback on each other's code.",
    pl: "Jak prowadzić mały zespół w Scrumie: planować sprinty, rzetelnie prowadzić tablicę i podejmować decyzje wspólnie.\n\nZnacznie lepiej nauczyłam się też korzystać z Gita w zespole — z gałęziami, pull requestami i konfliktami scalania — oraz dawać i przyjmować uwagi do swojego kodu.",
    it: "Come guidare un piccolo team con Scrum: pianificare gli sprint, tenere la board onesta e prendere decisioni insieme.\n\nSono migliorata molto anche nell'uso di Git in team, con branch, pull request e conflitti di merge, e nel dare e ricevere feedback sul codice degli altri.",
    de: "Wie man ein kleines Team mit Scrum führt: Sprints planen, das Board ehrlich halten und Entscheidungen gemeinsam treffen.\n\nAußerdem bin ich deutlich besser darin geworden, Git im Team zu nutzen, mit Branches, Pull Requests und Merge-Konflikten, und Feedback zum Code der anderen zu geben und anzunehmen.",
    ja: "Scrumで小さなチームを運営する方法——スプリントの計画、ボードを正直に保つこと、そして一緒に意思決定すること。\n\nまた、ブランチ、プルリクエスト、マージコンフリクトを含め、チームでGitを使いこなせるようになり、互いのコードにフィードバックを与えたり受け取ったりする力も伸びました。",
  },

  // ───────── Project page: Pyramid Null ─────────
  'project.pyramidNull.challenge': {
    en: "Making a game guide feel like an experience, not a menu: ancient Egypt mixed with neon and glitch effects, plus a voice chatbot with two characters, Pharaoh and Cleopatra.\n\nGetting the voice, the animations and the screens to work together smoothly on a phone was the tricky part.",
    pl: "Sprawienie, by przewodnik po grze był doświadczeniem, a nie menu: starożytny Egipt połączony z neonami i efektami glitch oraz głosowy chatbot z dwiema postaciami — Faraonem i Kleopatrą.\n\nNajtrudniejsze było sprawienie, by głos, animacje i ekrany płynnie współgrały na telefonie.",
    it: "Far sentire una guida di gioco come un'esperienza e non come un menu: antico Egitto mescolato a neon ed effetti glitch, più un chatbot vocale con due personaggi, Faraone e Cleopatra.\n\nFar funzionare insieme in modo fluido voce, animazioni e schermate su un telefono è stata la parte complicata.",
    de: "Einen Spielführer wie ein Erlebnis wirken zu lassen statt wie ein Menü: das alte Ägypten gemischt mit Neon- und Glitch-Effekten, dazu ein Sprach-Chatbot mit zwei Figuren, Pharao und Kleopatra.\n\nSprache, Animationen und Bildschirme auf dem Smartphone flüssig zusammenspielen zu lassen, war der knifflige Teil.",
    ja: "ゲームガイドを、メニューではなく体験として感じさせること——古代エジプトにネオンとグリッチ効果を重ね、ファラオとクレオパトラという2人のキャラクターによる音声チャットボットも用意しました。\n\n音声、アニメーション、画面をスマートフォン上で滑らかに連動させるのが難しいところでした。",
  },
  'project.pyramidNull.learned': {
    en: "How to bring a strong visual theme into native Android with XML layouts and animations, and how voice features change the way you design an app: timing, volume, and giving users control, like the music and guide voice switches in the settings.\n\nWorking in a team also taught me to agree on the structure early, so everyone's screens fit together.",
    pl: "Jak wprowadzić mocny motyw wizualny do natywnego Androida za pomocą układów XML i animacji oraz jak funkcje głosowe zmieniają sposób projektowania aplikacji: czas, głośność i oddanie użytkownikom kontroli, jak przełączniki muzyki i głosu przewodnika w ustawieniach.\n\nPraca w zespole nauczyła mnie też, by wcześnie ustalać strukturę, żeby ekrany wszystkich pasowały do siebie.",
    it: "Come portare un tema visivo forte nell'Android nativo con layout XML e animazioni, e come le funzioni vocali cambiano il modo di progettare un'app: tempi, volume e dare il controllo agli utenti, come gli interruttori di musica e voce guida nelle impostazioni.\n\nLavorare in team mi ha insegnato anche ad accordarmi presto sulla struttura, in modo che le schermate di tutti si incastrino.",
    de: "Wie man ein starkes visuelles Thema mit XML-Layouts und Animationen in natives Android bringt und wie Sprachfunktionen die Gestaltung einer App verändern: Timing, Lautstärke und Nutzern die Kontrolle zu geben, wie die Schalter für Musik und Führungsstimme in den Einstellungen.\n\nDie Arbeit im Team hat mir außerdem gezeigt, die Struktur früh abzustimmen, damit die Bildschirme aller zusammenpassen.",
    ja: "XMLレイアウトとアニメーションで、ネイティブAndroidに強いビジュアルテーマを取り入れる方法。そして、音声機能がアプリの設計をどう変えるか——タイミングや音量、そして設定にある音楽・ガイド音声のスイッチのように、ユーザーにコントロールを渡すこと。\n\nチームでの作業を通じて、全員の画面がうまくかみ合うよう、構造を早めに決めておくことの大切さも学びました。",
  },

  // ───────── Pyramid Null: picture descriptions ─────────
  'project.pyramidNull.shot1': {
    en: 'The create account page. Players fill in their details and choose the chatbot type for the voice assistant, Cleopatra or the Pharaoh.',
    pl: 'Strona zakładania konta. Gracz wpisuje swoje dane i wybiera typ chatbota dla asystenta głosowego — Kleopatrę lub Faraona.',
    it: 'La pagina di creazione dell\'account. I giocatori inseriscono i propri dati e scelgono il tipo di chatbot per l\'assistente vocale, Cleopatra o il Faraone.',
    de: 'Die Seite zum Erstellen eines Kontos. Spieler geben ihre Daten ein und wählen den Chatbot-Typ für den Sprachassistenten — Kleopatra oder den Pharao.',
    ja: 'アカウント作成画面。プレイヤーは自分の情報を入力し、音声アシスタントのチャットボット（クレオパトラかファラオ）を選びます。',
  },
  'project.pyramidNull.shot2': {
    en: 'The settings screen. You can switch the music and the guide voice on or off, choose who guides you, Cleopatra or the Pharaoh, and change the text size.',
    pl: 'Ekran ustawień. Możesz włączyć lub wyłączyć muzykę i głos przewodnika, wybrać, kto cię prowadzi — Kleopatra czy Faraon — oraz zmienić rozmiar tekstu.',
    it: 'La schermata delle impostazioni. Puoi attivare o disattivare la musica e la voce guida, scegliere chi ti guida, Cleopatra o il Faraone, e cambiare la dimensione del testo.',
    de: 'Der Einstellungsbildschirm. Du kannst Musik und Führungsstimme ein- oder ausschalten, wählen, wer dich führt — Kleopatra oder der Pharao — und die Textgröße ändern.',
    ja: '設定画面。音楽とガイド音声のオン/オフ、案内役（クレオパトラかファラオ）の選択、文字サイズの変更ができます。',
  },
  'project.pyramidNull.shot3': {
    en: 'Players can change their avatar and their background.',
    pl: 'Gracz może zmienić swój awatar i tło.',
    it: 'I giocatori possono cambiare il proprio avatar e lo sfondo.',
    de: 'Spieler können ihren Avatar und ihren Hintergrund ändern.',
    ja: 'プレイヤーはアバターと背景を変更できます。',
  },
  'project.pyramidNull.shot4': {
    en: 'The landing screen. New players can create an account, and returning players can log in.',
    pl: 'Ekran startowy. Nowi gracze mogą założyć konto, a pozostali mogą się zalogować.',
    it: 'La schermata iniziale. I nuovi giocatori possono creare un account, quelli che tornano possono accedere.',
    de: 'Der Startbildschirm. Neue Spieler können ein Konto erstellen, wiederkehrende Spieler können sich anmelden.',
    ja: 'ランディング画面。新しいプレイヤーはアカウントを作成でき、既存のプレイヤーはログインできます。',
  },
  'project.pyramidNull.shot5': {
    en: 'The main game page. Players switch between three different rooms of the game to find tips on how to pass the level.',
    pl: 'Główna strona gry. Gracz przełącza się między trzema pokojami w grze, aby znaleźć wskazówki, jak przejść poziom.',
    it: 'La pagina principale del gioco. I giocatori passano tra tre stanze diverse del gioco per trovare suggerimenti su come superare il livello.',
    de: 'Die Hauptseite des Spiels. Spieler wechseln zwischen drei verschiedenen Räumen des Spiels, um Tipps zu finden, wie sie das Level schaffen.',
    ja: 'ゲームのメインページ。プレイヤーはゲーム内の3つの部屋を切り替えながら、レベルを突破するためのヒントを探します。',
  },

  // ───────── Contact ─────────
  'contact.card.email': { en: 'Email', pl: 'E-mail', it: 'Email', de: 'E-Mail', ja: 'メール' },
  'contact.card.phone': { en: 'Phone', pl: 'Telefon', it: 'Telefono', de: 'Telefon', ja: '電話' },
  'contact.card.socials': { en: 'Find me online', pl: 'Znajdziesz mnie też tu', it: 'Mi trovi anche qui', de: 'Auch zu finden auf', ja: 'SNSでも' },
  'contact.heading': {
    en: 'Let’s build something together.',
    pl: 'Zbudujmy coś razem.',
    it: 'Costruiamo qualcosa insieme.',
    de: 'Lass uns zusammen etwas bauen.',
    ja: '一緒に何かを作りましょう。',
  },
  'contact.mail.message': { en: 'Message', pl: 'Wiadomość', it: 'Messaggio', de: 'Nachricht', ja: 'メッセージ' },
  'contact.mail.attach': { en: 'Attach a file', pl: 'Dołącz plik', it: 'Allega un file', de: 'Datei anhängen', ja: 'ファイルを添付' },
  'contact.sending': { en: 'Sending…', pl: 'Wysyłanie…', it: 'Invio in corso…', de: 'Wird gesendet…', ja: '送信中…' },
  'contact.almost': { en: 'Almost there.', pl: 'Prawie gotowe.', it: 'Quasi fatto.', de: 'Fast geschafft.', ja: 'あと少しです。' },
  'contact.mailtoText': {
    en: 'Your email app should open with the message ready. If nothing happens, write to',
    pl: 'Twoja aplikacja pocztowa powinna się otworzyć z gotową wiadomością. Jeśli nic się nie stanie, napisz na',
    it: 'La tua app di posta dovrebbe aprirsi con il messaggio già pronto. Se non succede nulla, scrivi a',
    de: 'Deine E-Mail-App sollte sich mit der fertigen Nachricht öffnen. Falls nichts passiert, schreibe an',
    ja: 'メールアプリがメッセージ入力済みで開きます。開かない場合は、次のアドレスまでご連絡ください:',
  },

  // ───────── Footer: accessibility menu ─────────
  'footer.dyslexiaFont': { en: 'Dyslexia-friendly font', pl: 'Czcionka dla osób z dysleksją', it: 'Font per la dislessia', de: 'Dyslexie-freundliche Schrift', ja: 'ディスレクシア対応フォント' },
  'footer.textSpacing': { en: 'Text spacing', pl: 'Odstępy w tekście', it: 'Spaziatura del testo', de: 'Textabstand', ja: '文字間隔' },
  'footer.underlineLinks': { en: 'Underline links', pl: 'Podkreślaj linki', it: 'Sottolinea i link', de: 'Links unterstreichen', ja: 'リンクに下線を付ける' },
  'footer.title': { en: 'Thanks for stopping by', pl: 'Dzięki, że wpadłeś', it: 'Grazie per la visita', de: 'Danke für deinen Besuch', ja: '見てくれてありがとう' },
  'footer.sayHello': { en: 'Say hello', pl: 'Napisz do mnie', it: 'Scrivimi', de: 'Schreib mir', ja: 'ご連絡はこちら' },
  'footer.copy': { en: 'Copy', pl: 'Kopiuj', it: 'Copia', de: 'Kopieren', ja: 'コピー' },
  'footer.copied': { en: 'Copied!', pl: 'Skopiowano!', it: 'Copiato!', de: 'Kopiert!', ja: 'コピーしました' },
  'footer.copyEmail': { en: 'Copy the email address', pl: 'Skopiuj adres e-mail', it: "Copia l'indirizzo email", de: 'E-Mail-Adresse kopieren', ja: 'メールアドレスをコピー' },
  'footer.socials': { en: 'Find me online', pl: 'Znajdziesz mnie tu', it: 'Mi trovi qui', de: 'Hier findest du mich', ja: 'SNS' },
  'footer.nowPlaying': { en: 'Now playing', pl: 'Teraz gra', it: 'In riproduzione', de: 'Läuft gerade', ja: '再生中' },
  'footer.tapToPlay': { en: 'Tap to play', pl: 'Kliknij, żeby włączyć', it: 'Tocca per ascoltare', de: 'Zum Abspielen tippen', ja: 'タップして再生' },
  'footer.close': { en: 'Close', pl: 'Zamknij', it: 'Chiudi', de: 'Schließen', ja: '閉じる' },

  // ───────── Small fixes to existing texts (these replace the originals) ─────────

  // German: "Scrollen zum Eingeben" means "scroll to type in"

  // Polish typo: "nachosow" -> "nachosów"

  // English typos: "built served as ... trough ... Paraoh"
  'project.pyramidNull.body1': {
    en: 'Pyramid Null is a collaborative app project that serves as a game guide for a game. Ancient Egyptian aesthetic fused with modern digital/tech themes — glitch effects, neon accents, interactive animations and a voice chatbot (Pharaoh and Cleopatra).',
    pl: 'Pyramid Null to wspólny projekt aplikacji, pełniącej funkcję przewodnika po grze. Estetyka starożytnego Egiptu połączona z nowoczesnymi motywami cyfrowymi/technologicznymi — efekty glitch, neonowe akcenty, interaktywne animacje oraz głosowy chatbot (Faraon i Kleopatra).',
    it: "Pyramid Null è un progetto app collaborativo, concepito come guida di gioco all'interno di un gioco. Estetica dell'antico Egitto fusa con temi digitali/tecnologici moderni — effetti glitch, accenti al neon, animazioni interattive e chatbot vocale (Faraone e Cleopatra).",
    de: 'Pyramid Null ist ein gemeinsames App-Projekt, das als Spielführer innerhalb eines Spiels dient. Altägyptische Ästhetik verschmilzt mit modernen digitalen/technischen Themen — Glitch-Effekte, Neonakzente, interaktive Animationen und ein Sprach-Chatbot (Pharao und Kleopatra).',
    ja: 'Pyramid Nullは、ゲーム内のゲームガイドとして機能する共同開発のアプリプロジェクトです。古代エジプトの美意識と現代的なデジタル/テック要素——グリッチエフェクト、ネオンのアクセント、インタラクティブなアニメーション、そして音声チャットボット（ファラオとクレオパトラ）——を融合させています。',
  },

  // ═════════ Desktop headline, widgets and dock ═════════
  'hero.introHello': { en: "I’m Klaudia.", pl: 'Jestem Klaudia.', it: 'Sono Klaudia.', de: 'Ich bin Klaudia.', ja: 'クラウディアです。' },
  'hero.introRole': { en: 'Web & App', pl: 'Web & App', it: 'Web & App', de: 'Web- & App-', ja: 'Web・アプリ' },
  'hero.introRole2': { en: 'Developer.', pl: 'Developerka.', it: 'Developer.', de: 'Entwicklerin.', ja: '開発者。' },
  'hero.introText': {
    en: 'Creating websites, apps and building creative immersive digital experiences.',
    pl: 'Tworzę strony internetowe, aplikacje i kreatywne, immersyjne doświadczenia cyfrowe.',
    it: 'Creo siti web, app ed esperienze digitali creative e immersive.',
    de: 'Ich erstelle Websites, Apps und kreative, immersive digitale Erlebnisse.',
    ja: 'ウェブサイトやアプリ、クリエイティブで没入感のあるデジタル体験をつくっています。',
  },
  'hero.photoCaption': { en: 'My manager, Nox', pl: 'Mój szef, Nox', it: 'Il mio capo, Nox', de: 'Mein Chef, Nox', ja: '上司のノックス' },
  'dock.label': { en: 'Main', pl: 'Główna', it: 'Principale', de: 'Haupt', ja: 'メイン' },
  'dock.toolbox': { en: 'Toolbox', pl: 'Narzędzia', it: 'Strumenti', de: 'Werkzeugkasten', ja: 'ツールボックス' },
  'dock.phone': { en: 'Call me', pl: 'Zadzwoń', it: 'Chiamami', de: 'Ruf mich an', ja: '電話する' },
  'dock.call': { en: 'Book a call', pl: 'Umów rozmowę', it: 'Prenota una chiamata', de: 'Gespräch buchen', ja: '通話を予約' },
  'dock.play': { en: 'Play', pl: 'Odtwórz', it: 'Riproduci', de: 'Abspielen', ja: '再生' },
  'dock.pause': { en: 'Pause', pl: 'Pauza', it: 'Pausa', de: 'Pause', ja: '一時停止' },

  // ═════════ About: the cards beside the text ═════════
  'about.glance.title': { en: 'At a glance', pl: 'W skrócie', it: 'In breve', de: 'Auf einen Blick', ja: 'ひと目で' },
  'about.glance.based': { en: 'Based in London', pl: 'Mieszkam w Londynie', it: 'Vivo a Londra', de: 'Lebe in London', ja: 'ロンドン在住' },
  'about.glance.from': { en: 'Originally from Bydgoszcz, Poland', pl: 'Pochodzę z Bydgoszczy', it: 'Originaria di Bydgoszcz, Polonia', de: 'Ursprünglich aus Bydgoszcz, Polen', ja: 'ポーランド・ビドゴシュチ出身' },
  'about.glance.degree': { en: 'BSc Web Development, First Class', pl: 'Licencjat z Web Developmentu z wyróżnieniem', it: 'Laurea in Web Development, First Class', de: 'BSc Webentwicklung, First Class', ja: 'ウェブ開発学士（First Class）' },
  'about.glance.studio': { en: 'Freelancing as CodedByKlaudia', pl: 'Freelancerka jako CodedByKlaudia', it: 'Freelance come CodedByKlaudia', de: 'Freiberuflich als CodedByKlaudia', ja: 'CodedByKlaudiaとしてフリーランス' },
  'about.glance.build': { en: 'Websites, web apps & Android apps', pl: 'Strony, aplikacje webowe i na Androida', it: 'Siti, web app e app Android', de: 'Websites, Web-Apps & Android-Apps', ja: 'ウェブサイト・ウェブアプリ・Androidアプリ' },
  'about.glance.status': { en: 'Available for new projects', pl: 'Dostępna dla nowych projektów', it: 'Disponibile per nuovi progetti', de: 'Offen für neue Projekte', ja: '新しいプロジェクト受付中' },
  'about.offClock.title': { en: 'Off the clock', pl: 'Po godzinach', it: 'Fuori orario', de: 'Nach Feierabend', ja: 'オフの時間' },
  'about.offClock.nox': { en: 'Long walks with Nox', pl: 'Długie spacery z Noxem', it: 'Lunghe passeggiate con Nox', de: 'Lange Spaziergänge mit Nox', ja: 'ノックスと長い散歩' },
  'about.offClock.matcha': { en: 'Iced blueberry matcha, always', pl: 'Mrożona matcha z borówką, zawsze', it: 'Matcha ghiacciato ai mirtilli, sempre', de: 'Eis-Matcha mit Blaubeere, immer', ja: 'アイスブルーベリー抹茶、いつでも' },
  'about.offClock.yoga': { en: 'Yoga & CrossFit', pl: 'Joga i CrossFit', it: 'Yoga e CrossFit', de: 'Yoga & CrossFit', ja: 'ヨガとクロスフィット' },
  'about.offClock.cinema': { en: 'Cinema nights (extra nachos)', pl: 'Wieczory w kinie (z nachosami)', it: 'Serate al cinema (con tanti nachos)', de: 'Kinoabende (extra Nachos)', ja: '映画の夜（ナチョス多め）' },
  'about.offClock.magic': { en: 'Anything Harry Potter', pl: 'Wszystko o Harrym Potterze', it: 'Tutto ciò che è Harry Potter', de: 'Alles rund um Harry Potter', ja: 'ハリー・ポッターのすべて' },

  // ═════════ Contact: topics and reply note ═════════
  'contact.topic.label': { en: "What's it about?", pl: 'Czego dotyczy?', it: 'Di cosa si tratta?', de: 'Worum geht es?', ja: 'ご用件は？' },
  'contact.topic.website': { en: 'A website', pl: 'Strona internetowa', it: 'Un sito web', de: 'Eine Website', ja: 'ウェブサイト' },
  'contact.topic.app': { en: 'An app', pl: 'Aplikacja', it: "Un'app", de: 'Eine App', ja: 'アプリ' },
  'contact.topic.collab': { en: 'Working together', pl: 'Współpraca', it: 'Collaborare', de: 'Zusammenarbeit', ja: '一緒に仕事' },
  'contact.topic.hi': { en: 'Just saying hi', pl: 'Tylko się przywitać', it: 'Solo un saluto', de: 'Einfach Hallo sagen', ja: 'ちょっと挨拶' },
  'contact.replyNote': { en: 'Usually replies within a day', pl: 'Zwykle odpowiadam w ciągu dnia', it: 'Di solito rispondo entro un giorno', de: 'Antwortet meist innerhalb eines Tages', ja: '通常1日以内に返信します' },

  // ═════════ Project pages: the screenshot gallery ═════════
  'project.gallery.title': { en: 'A closer look', pl: 'Z bliska', it: 'Uno sguardo da vicino', de: 'Ein genauerer Blick', ja: 'くわしく見る' },
  'project.gallery.hint': { en: 'Drag or use the arrows to explore', pl: 'Przeciągnij lub użyj strzałek', it: 'Trascina o usa le frecce', de: 'Ziehen oder Pfeile benutzen', ja: 'ドラッグまたは矢印で移動' },
  'project.gallery.prev': { en: 'Previous screenshot', pl: 'Poprzedni zrzut ekranu', it: 'Screenshot precedente', de: 'Vorheriger Screenshot', ja: '前のスクリーンショット' },
  'project.gallery.next': { en: 'Next screenshot', pl: 'Następny zrzut ekranu', it: 'Screenshot successivo', de: 'Nächster Screenshot', ja: '次のスクリーンショット' },
  'project.gallery.open': { en: 'Open large', pl: 'Otwórz w powiększeniu', it: 'Apri in grande', de: 'Groß öffnen', ja: '拡大して開く' },
  'project.gallery.soon': { en: 'Screenshot coming soon', pl: 'Zrzut ekranu wkrótce', it: 'Screenshot in arrivo', de: 'Screenshot folgt bald', ja: 'スクリーンショットは近日公開' },

  // ═════════ Lens Theory ═════════
  // (quoted text is the site's own English copy, as it appears in the screenshots)
  'project.lenstheory.tagline': {
    en: 'A website for a photography studio, with online booking and client accounts.',
    pl: 'Strona internetowa studia fotograficznego z rezerwacją online i kontami klientów.',
    it: 'Un sito web per uno studio fotografico, con prenotazione online e account per i clienti.',
    de: 'Eine Website für ein Fotostudio, mit Online-Buchung und Kundenkonten.',
    ja: 'オンライン予約と顧客アカウントを備えた、写真スタジオのウェブサイト。',
  },
  'project.lenstheory.body1': {
    en: 'Lens Theory is a website for a small photography studio: portraits, weddings, family sessions and more. Visitors can browse the work, book a session and keep everything in one place with their own account.',
    pl: 'Lens Theory to strona małego studia fotograficznego: portrety, śluby, sesje rodzinne i nie tylko. Odwiedzający mogą przeglądać prace, zarezerwować sesję i mieć wszystko w jednym miejscu dzięki własnemu kontu.',
    it: 'Lens Theory è il sito di un piccolo studio fotografico: ritratti, matrimoni, servizi di famiglia e altro ancora. I visitatori possono sfogliare i lavori, prenotare un servizio e tenere tutto in un unico posto con il proprio account.',
    de: 'Lens Theory ist die Website eines kleinen Fotostudios: Porträts, Hochzeiten, Familienshootings und mehr. Besucher können die Arbeiten ansehen, ein Shooting buchen und mit ihrem eigenen Konto alles an einem Ort behalten.',
    ja: 'Lens Theory は、ポートレート、ウェディング、家族写真などを手がける小さな写真スタジオのウェブサイトです。訪問者は作品を閲覧し、撮影を予約し、自分のアカウントですべてを一か所で管理できます。',
  },
  'project.lenstheory.body2': {
    en: 'Built with React and Tailwind on a Node.js backend, with Stripe for payments. Clients get a dashboard with their sessions, gallery, orders and details, and the whole site is designed to feel as warm as the photos.',
    pl: 'Zbudowana w React i Tailwind na backendzie Node.js, z płatnościami przez Stripe. Klienci mają panel ze swoimi sesjami, galerią, zamówieniami i danymi, a cała strona została zaprojektowana tak, by była równie ciepła jak zdjęcia.',
    it: 'Realizzato con React e Tailwind su un backend Node.js, con Stripe per i pagamenti. I clienti hanno una dashboard con i loro servizi, la galleria, gli ordini e i dati, e tutto il sito è pensato per essere caldo come le foto.',
    de: 'Entwickelt mit React und Tailwind auf einem Node.js-Backend, mit Stripe für Zahlungen. Kunden erhalten ein Dashboard mit ihren Shootings, ihrer Galerie, ihren Bestellungen und Daten, und die ganze Website ist so gestaltet, dass sie so warm wirkt wie die Fotos.',
    ja: 'React と Tailwind、Node.js のバックエンドで構築し、決済には Stripe を使用。顧客は撮影、ギャラリー、注文、登録情報をまとめたダッシュボードを利用でき、サイト全体は写真と同じくらい温かみを感じられるようにデザインしました。',
  },
  'project.lenstheory.shot1': {
    en: 'Homepage: a full-width hero introduces the studio, followed by an auto-scrolling showcase of the photography services on offer.',
    pl: 'Strona główna: pełnoekranowa sekcja hero przedstawia studio, a pod nią automatycznie przewijana prezentacja oferowanych usług fotograficznych.',
    it: 'Homepage: una hero a tutta larghezza presenta lo studio, seguita da una vetrina a scorrimento automatico dei servizi fotografici offerti.',
    de: 'Startseite: Ein Hero-Bereich in voller Breite stellt das Studio vor, darunter eine automatisch laufende Übersicht der angebotenen Fotografie-Leistungen.',
    ja: 'ホームページ：全幅のヒーローセクションでスタジオを紹介し、その下で提供する撮影サービスを自動スクロールで紹介しています。',
  },
  'project.lenstheory.shot2': {
    en: 'Portfolio gallery with category filters (Portraits, Weddings, Family, Events and Pets) and a lightbox for viewing each photo in full.',
    pl: 'Galeria portfolio z filtrowaniem według kategorii (portrety, śluby, rodzina, wydarzenia i zwierzęta) oraz lightboxem do oglądania zdjęć w pełnym rozmiarze.',
    it: 'Galleria del portfolio con filtri per categoria (ritratti, matrimoni, famiglia, eventi e animali) e un lightbox per vedere ogni foto a schermo intero.',
    de: 'Portfolio-Galerie mit Kategoriefiltern (Porträts, Hochzeiten, Familie, Events und Haustiere) und einer Lightbox, um jedes Foto in voller Größe anzusehen.',
    ja: 'カテゴリー（ポートレート、ウェディング、家族、イベント、ペット）で絞り込めるポートフォリオギャラリー。ライトボックスで各写真を大きく表示できます。',
  },
  'project.lenstheory.shot3': {
    en: 'Booking form designed as a personal letter: clients fill in their details, choose a session type and date, and submit the request in a single step.',
    pl: 'Formularz rezerwacji zaprojektowany jak osobisty list: klient uzupełnia swoje dane, wybiera rodzaj sesji i termin, a następnie wysyła zgłoszenie w jednym kroku.',
    it: 'Modulo di prenotazione pensato come una lettera personale: il cliente inserisce i propri dati, sceglie il tipo di servizio e la data e invia la richiesta in un solo passaggio.',
    de: 'Buchungsformular im Stil eines persönlichen Briefs: Kundinnen und Kunden tragen ihre Daten ein, wählen Art und Termin des Shootings und senden die Anfrage in einem Schritt ab.',
    ja: '手紙のようにデザインした予約フォーム。お客様は情報を入力し、撮影の種類と日付を選んで、ワンステップでリクエストを送信できます。',
  },
  'project.lenstheory.shot4': {
    en: 'Site footer with navigation, contact details and a newsletter sign-up, keeping key actions within reach on every page.',
    pl: 'Stopka strony z nawigacją, danymi kontaktowymi i zapisem do newslettera, dzięki czemu najważniejsze akcje są dostępne na każdej podstronie.',
    it: 'Footer del sito con navigazione, contatti e iscrizione alla newsletter, così le azioni principali sono sempre a portata di mano su ogni pagina.',
    de: 'Footer mit Navigation, Kontaktdaten und Newsletter-Anmeldung, damit die wichtigsten Aktionen auf jeder Seite erreichbar bleiben.',
    ja: 'ナビゲーション、連絡先、ニュースレター登録をまとめたフッター。主要な操作にどのページからでもアクセスできます。',
  },
  'project.lenstheory.shot5': {
    en: 'Client dashboard bringing sessions, private galleries, orders and account details together in one place, shown here after a completed Stripe payment.',
    pl: 'Panel klienta, który łączy sesje, prywatne galerie, zamówienia i dane konta w jednym miejscu, tutaj po zrealizowanej płatności przez Stripe.',
    it: 'Dashboard del cliente che riunisce servizi, gallerie private, ordini e dati dell\'account in un unico posto, qui dopo un pagamento completato con Stripe.',
    de: 'Kunden-Dashboard, das Shootings, private Galerien, Bestellungen und Kontodaten an einem Ort bündelt, hier nach einer abgeschlossenen Stripe-Zahlung.',
    ja: '撮影、プライベートギャラリー、注文、アカウント情報を一か所にまとめた顧客ダッシュボード。Stripeでの支払い完了後の画面です。',
  },
  'project.lenstheory.shot6': {
    en: 'Responsive mobile navigation with account sign-in and a prominent booking call to action.',
    pl: 'Responsywna nawigacja mobilna z logowaniem do konta i wyraźnym przyciskiem rezerwacji.',
    it: 'Navigazione mobile responsive con accesso all\'account e un invito alla prenotazione ben in evidenza.',
    de: 'Responsive mobile Navigation mit Konto-Anmeldung und einem gut sichtbaren Button zum Buchen.',
    ja: 'アカウントへのログインと目立つ予約ボタンを備えた、レスポンシブなモバイルナビゲーション。',
  },
  'project.lenstheory.challenge': {
    en: "Building a booking platform that takes real payments online, and it was the first time I had ever worked with payments. Taking someone's money is very different from sending a form: every step has to be secure, and a booking should only be confirmed once the payment has actually gone through.\n\nLearning how Stripe works, and connecting it to my own Node.js backend without ever handling card details myself, was the biggest challenge.",
    pl: "Stworzenie platformy rezerwacji, która przyjmuje prawdziwe płatności online, i to był mój pierwszy raz z płatnościami. Przyjmowanie czyichś pieniędzy to coś zupełnie innego niż wysłanie formularza: każdy krok musi być bezpieczny, a rezerwacja może zostać potwierdzona dopiero wtedy, gdy płatność faktycznie przejdzie.\n\nNajwiększym wyzwaniem było zrozumienie, jak działa Stripe, i połączenie go z moim własnym backendem w Node.js tak, żebym nigdy sama nie miała do czynienia z danymi kart.",
    it: "Realizzare una piattaforma di prenotazione che accetta pagamenti online reali, ed era la prima volta che lavoravo con i pagamenti. Ricevere i soldi di qualcuno è molto diverso dall'inviare un modulo: ogni passaggio deve essere sicuro, e una prenotazione va confermata solo quando il pagamento è andato davvero a buon fine.\n\nLa sfida più grande è stata capire come funziona Stripe e collegarlo al mio backend in Node.js senza mai gestire io stessa i dati delle carte.",
    de: "Eine Buchungsplattform zu bauen, die echte Zahlungen online annimmt, und es war das erste Mal, dass ich mit Zahlungen gearbeitet habe. Das Geld von jemandem anzunehmen ist etwas ganz anderes, als ein Formular abzuschicken: Jeder Schritt muss sicher sein, und eine Buchung darf erst bestätigt werden, wenn die Zahlung wirklich durchgegangen ist.\n\nDie größte Herausforderung war, zu verstehen, wie Stripe funktioniert, und es mit meinem eigenen Node.js-Backend zu verbinden, ohne jemals selbst Kartendaten zu verarbeiten.",
    ja: "実際のオンライン決済に対応した予約プラットフォームの開発で、決済を扱うのはこれが初めてでした。人のお金を受け取ることは、フォームを送信するのとはまったく違います。すべてのステップが安全でなければならず、予約は支払いが本当に完了してから確定させる必要があります。\n\nStripeの仕組みを理解し、カード情報を自分で一切扱わずに自作のNode.jsバックエンドと連携させることが、いちばんの挑戦でした。",
  },
  'project.lenstheory.learned': {
    en: "How online payments work from start to finish: creating the payment on the server, sending the customer to Stripe's secure checkout, and confirming the booking only once Stripe reports that the payment has succeeded.\n\nI also learned to test every path, including failed and cancelled payments, with Stripe's test cards, and to keep secret keys on the server and out of the code. I now feel confident adding payments to any project.",
    pl: "Jak działają płatności online od początku do końca: tworzenie płatności na serwerze, przekierowanie klienta do bezpiecznej strony płatności Stripe i potwierdzanie rezerwacji dopiero wtedy, gdy Stripe zgłosi, że płatność się powiodła.\n\nNauczyłam się też testować każdą ścieżkę, w tym nieudane i anulowane płatności, za pomocą testowych kart Stripe, oraz trzymać tajne klucze na serwerze, a nie w kodzie. Teraz z pewnością dodam płatności do każdego projektu.",
    it: "Come funzionano i pagamenti online dall'inizio alla fine: creare il pagamento sul server, indirizzare il cliente al checkout sicuro di Stripe e confermare la prenotazione solo quando Stripe comunica che il pagamento è riuscito.\n\nHo anche imparato a testare ogni percorso, compresi i pagamenti non riusciti e annullati, con le carte di prova di Stripe, e a tenere le chiavi segrete sul server e fuori dal codice. Ora mi sento sicura nell'aggiungere i pagamenti a qualsiasi progetto.",
    de: "Wie Online-Zahlungen von Anfang bis Ende funktionieren: die Zahlung auf dem Server anlegen, den Kunden zum sicheren Checkout von Stripe weiterleiten und die Buchung erst bestätigen, wenn Stripe meldet, dass die Zahlung erfolgreich war.\n\nAußerdem habe ich gelernt, jeden Weg mit den Testkarten von Stripe zu prüfen, auch fehlgeschlagene und abgebrochene Zahlungen, und geheime Schlüssel auf dem Server und aus dem Code herauszuhalten. Jetzt traue ich mir zu, Zahlungen in jedes Projekt einzubauen.",
    ja: "オンライン決済の流れを最初から最後まで学びました。サーバーで決済を作成し、お客様をStripeの安全な決済ページへ案内し、Stripeから支払い成功の通知が届いてはじめて予約を確定させる、という流れです。\n\nまた、Stripeのテストカードを使って、失敗やキャンセルを含むすべてのパターンをテストすること、そして秘密鍵をコードに入れずサーバー側で管理することも学びました。今では、どんなプロジェクトにも自信を持って決済機能を組み込めます。",
  },
  'project.lenstheory.shot7': {
    en: 'Mobile view of the footer: a tilted film strip of recent sessions above the closing headline, with a rotating “Book a session” button.',
    pl: 'Stopka w widoku mobilnym: przechylona taśma filmowa z ostatnimi sesjami nad hasłem zamykającym stronę i obracający się przycisk „Book a session”.',
    it: 'Il footer in versione mobile: una pellicola inclinata con i servizi più recenti sopra il titolo di chiusura e un pulsante rotante “Book a session”.',
    de: 'Der Footer in der mobilen Ansicht: ein schräger Filmstreifen mit aktuellen Shootings über der abschließenden Headline und ein rotierender „Book a session“-Button.',
    ja: 'モバイル表示のフッター：最近の撮影を並べた斜めのフィルムストリップ、締めくくりの見出し、そして回転する「Book a session」ボタン。',
  },
};
