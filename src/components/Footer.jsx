import React from "react";
import dino from "/assets/logos/dinoBlack.png";

export default function Footer() {
  return (
    <>
      <nav
        id="footer"
        className="listbox pill"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          id="footer-wrapper"
          className="soft-box-shadow"
          style={{
            boxShadow: "rgba(2, 2, 43, 0.2) 0px 2px 15px",
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(255, 255, 255, 0.667)",
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "2.5em",
            paddingTop: "2.5em",
            width: "100%",
            zIndex: 100,
            position: "relative",
          }}
        >
          <div
            className="content"
            style={{ display: "block", maxWidth: "1200px", width: "94%" }}
          >
            <div
              className="columns shift"
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingBottom: "1em",
              }}
            >
              <div
                className="column"
                style={{
                  padding: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="Dinomite-logo"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: "1.35em",
                    marginLeft: "-19px",
                  }}
                >
                  <a
                    className="router-link-active router-link-exact-active"
                    aria-current="page"
                    href="#"
                    style={{
                      borderRadius: "1em",
                      textDecoration: "none",
                      color: "inherit",
                      fontFamily: '"Nunito Sans", sans-serif',
                    }}
                  >
                    <img
                      alt="Dinomite logo"
                      src={dino}
                      style={{
                        height: "107px",
                        marginBottom: "2px",
                        marginTop: "2px",
                        maxHeight: "2.5em",
                        verticalAlign: "middle",
                        width: "107px",
                      }}
                    />
                  </a>
                </div>
              </div>
              <div
                className="column"
                style={{
                  padding: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Resources
                </p>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Get Started with Dinomite Engine
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Download for <span className="notranslate"> Unity</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Download for <span className="notranslate"> Blender</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Dinomite Cloud</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Dinomite Viewer</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Pricing
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Samples
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Compare with other tools
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  FAQ
                </a>
              </div>
              <div
                className="column"
                style={{
                  padding: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Community
                </p>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Support Forum
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Discord</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Twitter/X</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">YouTube</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Instagram</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">LinkedIn</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Bluesky</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">Reddit</span>
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate">TikTok</span>
                </a>
              </div>
              <div
                className="column"
                style={{
                  padding: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Company
                </p>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  About
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Terms and Conditions
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  Website Privacy Policy
                </a>
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  GitHub
                </a>
                <a
                  href="#"
                  target="_blank"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  hi@Dinomite.tools
                </a>
              </div>
            </div>
            <div
              className="copyright"
              style={{
                display: "flex",
                fontSize: "0.75em",
                justifyContent: "center",
                opacity: 0.7,
                paddingTop: "1em",
              }}
            >
              <span style={{ marginRight: "3em" }}>
                © 2024{" "}
                <a
                  href="#"
                  style={{
                    borderRadius: "1em",
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "14px",
                    lineHeight: 1.42859,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className="notranslate" style={{ marginRight: "3em" }}>
                    {" "}
                    Dinomite Tools GmbH{" "}
                  </span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
  
    </>
  );
}
