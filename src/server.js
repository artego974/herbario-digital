const express = require("express")
const cors = require("cors")
const db = require("./db_settings")

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())

app.get("/buscar", (req,res) => {
    db.query("SELECT nome_popular, nome_cientifico, familia_botanica, origem_distribuicao, usos_medicinais, principios_ativos, parte_utilizada, modo_preparo, contraindicacoes, imagem FROM plantas", (err, results)=>{
        if(err){
            console.error("Ocorreu um erro: ", err)
            res.status(500).json({ erro: "Erro ao buscar" })
        } else {
            res.json(results)
        }
    })
    
})
app.post("/criar", (req, res) => {
  const params = [
    req.body.nome_popular,
    req.body.nome_cientifico,
    req.body.familia_botanica,
    req.body.origem_distribuicao,
    req.body.usos_medicinais,
    req.body.principios_ativos,
    req.body.parte_utilizada,
    req.body.modo_preparo,
    req.body.contraindicacoes,
    req.body.imagem,
  ];

  const query = `
        INSERT INTO plantas (
            nome_popular, nome_cientifico, familia_botanica,
            origem_distribuicao, usos_medicinais, principios_ativos,
            parte_utilizada, modo_preparo, contraindicacoes, imagem
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro no MySQL:", err);
      res
        .status(400)
        .json({ success: false, message: "Erro ao inserir", data: err });
    } else {
      res
        .status(201)
        .json({
          success: true,
          message: "Planta adicionada com sucesso",
          data: results,
        });
    }
  });
});




app.listen(port, ()=> {
    console.log(`Servidor funcionando na porta ${port}, ou para facilitar http://localhost:${port}`)
})

