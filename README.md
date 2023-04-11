
Dere skal lage et system som for en skole som har en rekke Rasperry Pier, Micro:bits og Arduinoer, alt med tilleggsutstyr. Systemet skal holde på informasjon om alle enhetene og ekstrautstyr, og la elever bla gjennom hva som er tilgjengelig av utstyr og legge inn bestilling på utstyr. Lærere skal kunne gå inn og se bestillinger som er gjort, og bekrefte reservasjon og utlevering av utstyr. Ved innlevering er det lærer som registrerer utstyr som innlevert. Lærere og elever skal kunne registrere seg selv, men lærere får ikke lærerstatus før administrator har godkjent søknad om dette. Det er kun administrator som skal kunne legge inn nytt utstyr.


System:
- Ha info om alle enheter + ekstra utstyr til hver enhet

Admin:
- Godkjenne lærer oppretting
- legge inn nytt utstyr
Elev:
- Opprette konto selv
- Se og bestille utstyr
Lærer:
- Oprette konto selv, men må goskjennes av admin
- Se bestillinger
- Bekrefte reservasjon -> bekrefte utlevering -> bekrefte innlevering


Pages:

Oversikt:
- Alle enheter som ikke har en bestilling med status "reservert" eller "utlevert"
- Bestillingsside:
	- Velge utstyr for enhet

Bestillinger (lærer)/Mine bestillinger (elev):
- Bestillinger:
	- Se og godkjenne/ikke godkjenne bestilling -> status "reservert"
	- Sette status fra "reservert" til "utlevert"
	- Sette status fra "utlevert" til "innlevert", arkiverer bestilling
- Mine bestillinger
	- Se status på bruker sine bestillinger

Login/register:
- account type "lærer" or "elev" + "admin" (kun login)

Change password:
- All account types

Admin side:
- Konto godkjenning:
	- Se og godkjenne lærer kontoer
- Utstyr
	- Se og legge til nytt utstyr