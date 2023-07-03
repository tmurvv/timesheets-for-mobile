import express, { Express, Request, Response} from "express";

const PORT = 3050;
const app = express();

app.get("/", (req,res)=>{
   res.send("IMIN plus concurrently")
});

app.get("/hi", (req, res) => {
   res.send("HI THERE plus concurrently");
});
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`));