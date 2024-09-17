const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws');
const barbearia = require('../barbearia');
const servicos = require('../servicos');

router.post('/', async (req, res) => {
  let busboy = new Busboy({ headers: req.headers });

  busboy.on('finish', async () => {
    try {
      let erros = [];
      let arquivos = [];

      if (req.files && Object.keys(req.files).length > 0) {
      
        if (error.length > 0) {
            res.json(errors[0]);
            return false;
        }
        for (let key of Object.keys(req.files)) {
          const file = req.files[key];
          const nameParts = file.name.split('.');
          const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
          
         
          const barbeariaid = '';
          const path = `servicos/${barbeariaid}/${fileName}`;

          const response = await aws.uploadToS3(file, path);

          if (response.error) {
            erros.push({ error: true, message: response.message });
          } else {
            arquivos.push(path); // Supondo que você queira armazenar o retorno do sucesso
          }
        }
      }

      arquivos = arquivos.map((arquivo) => ({
        referenciaid: servicoCadastro._id,
        model: 'Servico',
        caminho: arquivo,
    }));

    await arquivos.isertMany(arquivos);

      res.json({ barbearia, erros, arquivos }); // Inclui os arquivos e erros no retorno
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });

  req.pipe(busboy);
});


router.put('/:id', async (req, res) => {
    let busboy = new Busboy({ headers: req.headers });
  
    busboy.on('finish', async () => {
      try {
        let erros = [];
        let arquivos = [];
  
        if (req.files && Object.keys(req.files).length > 0) {
        
          if (error.length > 0) {
              res.json(errors[0]);
              return false;
          }
          for (let key of Object.keys(req.files)) {
            const file = req.files[key];
            const nameParts = file.name.split('.');
            const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
            
           
            const barbeariaid = '';
            const path = `servicos/${barbeariaid}/${fileName}`;
  
            const response = await aws.uploadToS3(file, path);
  
            if (response.error) {
              erros.push({ error: true, message: response.message });
            } else {
              arquivos.push(path); // Supondo que você queira armazenar o retorno do sucesso
            }
          }
        }
        const jsonServico = json.parse(servicos);
          await servicos.findByAndUpdate(req.params.id, jsonServico );

        // criar arquivo
        arquivos = arquivos.map((arquivo) => ({
            referenciaid: req.params.id,
            model: 'Servico',
            caminho: arquivo,
        }));

        await arquivos.isertMany(arquivos);
  
        res.json({ error: false}); // Inclui os arquivos e erros no retorno
      } catch (err) {
        res.json({ error: true, message: err.message });
      }
    });
  
    req.pipe(busboy);
  });

  router.get('/barbearia/:barbeariaid', async (req, res) => {
    try {
        let servicosBarbearia = [];
    const servicos = await servicos.find({
        barbeariaid: req.params.barbeariaid,
        status: {$ne: 'E'},
    });

    for (let servico of servicos) {
        const arquivos = await Arquivos.find({
            model: 'Servico',
            referenciaid: servico._id
        });
        servicosSalao.push({...servico._doc, arquivos});
    }

    res.json({
        servicos: servicosSalao,
    })
    } catch (err) {
        res.json({error: true, message: err.message})
    }
  });

  router.post('/remove-arquivo', async (req, res) => {
    try {
     const {id} = req.params;
     
     // Excluir AWS
     await aws.deleteFileS3(id);

     await Arquivo.fineOneAndDelete({
        caminho: id,
     });

     res.json({error: false});

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await servicos.findByAndUpdate(id, { status: 'E' });
        res.json({error: false});
   
       } catch (err) {
           res.json({ error: true, message: err.message });
       }
  })

module.exports = router;
