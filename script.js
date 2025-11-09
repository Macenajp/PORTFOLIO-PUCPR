document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.getElementById('copyright');
    const currentYear = new Date().getFullYear();                                                               // Com isso vai atualizar o ano automaticamente no footer

    copyrightElement.textContent = `© ${currentYear} João Pedro Macena Correa. Todos os direitos reservados.`;  // Vai atualizra o texto (ano) do rodapé
});


document.addEventListener('DOMContentLoaded', function() {
    
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} João Pedro Macena Correa. Todos os direitos reservados.`;
    }

    const enviarBtn = document.getElementById('enviar-btn');
    const promptInput = document.getElementById('prompt-input');
    const respostaOllama = document.getElementById('resposta-ollama');

    if (enviarBtn && promptInput && respostaOllama) {
        
        enviarBtn.addEventListener('click', function() {
            
            const promptTexto = promptInput.value;
            if (!promptTexto) {
                alert("Por favor, digite algo no campo de prompt.");
                return;
            }

            enviarBtn.textContent = "Processando...";
            enviarBtn.style.pointerEvents = 'none'; 
            respostaOllama.textContent = "Pensando...";

            fetch('http://localhost:5000/api/processar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptTexto })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.response) {
                    respostaOllama.textContent = data.response;
                } else if (data.erro) {
                     respostaOllama.textContent = `Erro: ${data.erro}`;
                } else {
                    respostaOllama.textContent = "Erro: A resposta não veio no formato esperado.";
                }
            })
            .catch(error => {
                console.error('Erro na requisição fetch:', error);
                respostaOllama.textContent = `Erro ao conectar com o backend. Confira se o 'app.py' está rodando. Detalhe: ${error.message}`;
            })
            .finally(() => {
                enviarBtn.textContent = "Enviar";
                enviarBtn.style.pointerEvents = 'auto'; 
            });
        });
    }
});


            fetch('http://localhost:5000/api/processar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptTexto })
            })
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    respostaOllama.textContent = data.response;
                }
})
