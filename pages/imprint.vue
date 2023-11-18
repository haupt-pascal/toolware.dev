<template>
    <div>
        <Navigation />
        <div class="legal">
            <h1>Impressum</h1>

            <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>Pascal Haupt<br />
                Pascal Haupt Einzelunternehmen<br />
                Hilshof, 3<br />
                30419 Hannover</p>

            <h2>Kontakt</h2>
            <p>Telefon: 017656882731<br />
                E-Mail: imprint@haupt.design</p>

            <h2>Redaktionell verantwortlich</h2>
            <p>Pascal Haupt</p>

            <h2>EU-Streitschlichtung</h2>
            <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
                    href="https://ec.europa.eu/consumers/odr/" target="_blank"
                    rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden
                Sie oben im Impressum.</p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.</p>

            <p>Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
        </div>
        <Footer />
    </div>
</template>
<style lang="scss" scoped>
    @import '@/assets/stylesheet/style';

.legal {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    h1 {
        text-align: left;
    }

    h2 {
        text-align: left;
    }

    h3 {
        text-align: left;
    }
}
</style>