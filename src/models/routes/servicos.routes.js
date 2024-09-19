const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws');
const BarbeariaModel = require('../barbearia');
const ServicosModel = require('../servicos');
const ArquivosModel = require('../arquivos');

// Upload e cadastro de serviços para a barbearia única
router.post('/', async (req, res) => {
    let busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', async () => {
        try {
            let erros = [];
            let arquivos = [];
            
            // Verifica se há arquivos para fazer upload
            if (req.files && Object.keys(req.files).length > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];
                    const fileName = `${new Date().getTime()}.${file.name.split('.').pop()}`;
                    const path = `servicos/unica/${fileName}`;  // Alterado para uma estrutura de diretório simples para barbearia única

                    const response = await aws.uploadToS3(file, path);
                    if (response.error) {
                        erros.push({ error: true, message: response.message });
                    } else {
                        arquivos.push(path);
                    }
                }
            }

            // Grava os arquivos no banco de dados
            const arquivosToInsert = arquivos.map((arquivo) => ({
                referenciaid: servicoCadastro._id,  // Certifique-se de que o serviço foi criado antes
                model: 'Servico',
                caminho: arquivo,
            }));

            await ArquivosModel.insertMany(arquivosToInsert);

            res.json({ sucesso: true, erros, arquivos });
        } catch (err) {
            res.json({ error: true, message: err.message });
        }
    });

    req.pipe(busboy);
});
