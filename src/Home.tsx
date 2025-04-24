import { Link } from "react-router-dom";
import waterBackground from "./assets/water.jpg";
import kistenBild from "./assets/kiste.png";
import printMaterial from "./print/material_v1.pdf";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${waterBackground})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        fontFamily: "sans-serif",
        padding: "40px 20px",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Willkommen in der Unterwasserwelt!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Begib dich auf die Reise und finde den Schatz der Tiefsee!
      </p>

      <div style={{ marginBottom: "3rem" }}>
        <a
          href={printMaterial}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              margin: "10px",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            🖨 Zu den Druck-Materialien
          </button>
        </a>
        <Link to="/game">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              margin: "10px",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            🐙 Zum Online-Spiel (in Entwicklung)
          </button>
        </Link>
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "700px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <h2>🌊 Über das Spiel</h2>
        <p style={{ marginTop: "1rem" }}>
          Die Spielidee basiert auf einem Videospiel aus den 1970er Jahren –{" "}
          <strong>Hunt the Wumpus</strong>. Das Spiel wird auch im bekannten
          KI-Lehrbuch <em>"Künstliche Intelligenz: Ein moderner Ansatz"</em> von{" "}
          <strong>Stuart Russell und Peter Norvig</strong> beschrieben und
          genutzt.
        </p>

        <p style={{ marginTop: "1rem" }}>
          In diesem Szenario bewegt sich ein Agent durch ein unbekanntes
          Labyrinth voller Gefahren. Er muss logische Regeln anwenden, um aus
          indirekten Hinweisen sichere Entscheidungen zu treffen und schließlich
          den Schatz zu finden. In unserem Spiel wurde dieses Prinzip
          kindgerecht in eine fantasievolle Unterwasserwelt übertragen.
        </p>

        <p style={{ marginTop: "1rem" }}>
          Ziel ist es, spielerisch ein Verständnis für{" "}
          <strong>regelbasierte Entscheidungsprozesse in KI-Systemen</strong> zu
          fördern und das Gebiet der <strong>wissensbasierten KI</strong> als Grundlage für symbolische Entscheidungsfindung zu vermitteln.
        </p>

        <a href={kistenBild} target="_blank" rel="noopener noreferrer">
          <img
            src={kistenBild}
            alt="KI in der Kiste"
            style={{
              maxWidth: "400px",
              borderRadius: "12px",
              transition: "transform 0.2s",
              cursor: "zoom-in",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </a>
        <p style={{ marginTop: "0rem", textAlign: "center" }}>
          Im Projekt{" "}
          <a
            href="https://www.kiki-labor.fau.de/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <strong>KI in der Kiste</strong>
          </a>
           {" "}ist das Spiel als{" "}
          <a
            href="https://www.kiki-labor.fau.de/station13/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <strong>Kiste 13 „Schatzjäger“</strong>
          </a>{" "}
          als vollständig analoge „unplugged“-Version verfügbar.
        </p>
      </div>
    </div>
  );
}

export default Home;
