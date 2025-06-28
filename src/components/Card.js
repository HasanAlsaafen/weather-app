import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CloudIcon from "@mui/icons-material/Cloud";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "moment/locale/ar";

export default function MyCard() {
  const [lan, setLan] = useState("en");
  const [date, setDate] = useState("");
  const [tempar, setTemp] = useState({});
  const { t, i18n } = useTranslation();

  const API = "388f321489a3bbba15117a73d10ae0d7";
  const lat = 31.52935;
  const lon = 35.0938;
  useEffect(() => {
    i18n.changeLanguage(lan);
    moment.locale(lan);
    setDate(moment().format("MMM Do YY"));
  }, [lan]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setTemp(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
        } else {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);
  const handleChange = (event) => {
    setLan(event.target.value);
  };

  return (
    <>
      <Container
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card
          dir={lan === "en" ? "ltr" : "rtl"}
          sx={{
            backgroundColor: "rgba(3, 30, 84, 0.5)",
            borderRadius: "16px",
            boxShadow: "8px 8px 30px rgba(0, 0, 0, 0.25)",
            color: "white",
          }}
        >
          <CardContent>
            <div
              dir={lan === "en" ? "ltr" : "rtl"}
              style={{
                display: "flex",
              }}
            >
              <h3>
                {tempar.name
                  ? lan === "en"
                    ? tempar.name
                    : t(tempar.name)
                  : ""}{" "}
                <sub style={{ opacity: "0.5" }}>{date}</sub>
              </h3>
            </div>
            <Divider style={{ backgroundColor: "white" }} />
            <div
              dir={lan === "en" ? "ltr" : "rtl"}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
              }}
            >
              <div dir={lan === "en" ? "ltr" : "rtl"}>
                {tempar.main && tempar.weather && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <h1>{tempar.main.temp}°</h1>
                    <img
                      src={`https://openweathermap.org/img/wn/${tempar.weather[0].icon}@2x.png`}
                      alt="weather"
                    />
                  </div>
                )}

                <div dir={lan === "en" ? "ltr" : "rtl"}>
                  <p style={{ fontWeight: "800" }}>
                    {" "}
                    {tempar.weather ? t(tempar.weather[0].description) : ""}
                  </p>
                  <div style={{ display: "flex" }}>
                    <span>
                      {t("Smallest")} {tempar.main ? tempar.main.temp_min : ""}
                    </span>
                    <div
                      dir={lan === "en" ? "ltr" : "rtl"}
                      style={{
                        height: "20px",
                        width: "1.75px",
                        marginLeft: "8px",
                        marginRight: "8px",
                        backgroundColor: "white",
                      }}
                    ></div>
                    <span>
                      {t("largest")}{" "}
                      {tempar.main ? tempar.main.temp_max : ""}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <CloudIcon style={{ fontSize: "200" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div style={{ position: "relative", right: "140px", top: "8px" }}>
          <FormControl
            fullWidth
            style={{
              backgroundColor: "ButtonShadow",
              width: "142px",
              borderRadius: "16px",
              border: "0 0 0 0",
            }}
          >
            <InputLabel id="demo-simple-select-label" color="dark">
              langauge 🌐
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lan}
              label="Language"
              onChange={handleChange}
              color="info"
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"ar"}>عربي</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Container>
    </>
  );
}
