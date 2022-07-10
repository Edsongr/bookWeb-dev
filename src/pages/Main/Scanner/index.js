import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import Quagga from 'quagga';

import { validateIsbn } from '../../../services/books';

import { Video, Container, ScanMarker } from './styles';

function Scanner({ onScan }) {

  let scannerAttemps = 0;

  const onDetected = result => {

    Quagga.offDetected(onDetected);

    const isbn = result.codeResult.code;
    
    if(validateIsbn(isbn)){
      alert(isbn);
      onScan(isbn);
      return;
    } 

    if(scannerAttemps >= 5) {
      alert("Não Foi possível ler o código");
    }

    scannerAttemps++;
    Quagga.onDetected(onDetected);

  }

  useEffect(()=>{

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      Quagga.init(
      {
        inputStream:{
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode_canvas"),
          constraints:{
            facingMode:"environment",
          },
         },
         numOfWorkers:1,
         locate: true,
         decoder: {
          readers: ['ean_reader'],
         },
      },
      err => {
        if(err){
          console.log(err);
          alert("Erro ao abrir a câmera do dispositivo, please giv permission");
          return;
        }
         Quagga.start()
      },

        Quagga.onDetected(onDetected),
      )
    }

  }, []);

  return ( <>
    <Video id="barcode_canvas"> </Video>
    <Container>
      <ScanMarker>
        <img 
          src="../../../assets/qr-code.svg" 
          alt="Marca para leitura do código"
          width="260"
          height="260"
        />
        <p className="label">Aponte para o Código de Barra.</p>
      </ScanMarker>
    </Container>
 </> );
}

Scanner.propTypes={
  onScan: PropTypes.func,
}

export default Scanner;

