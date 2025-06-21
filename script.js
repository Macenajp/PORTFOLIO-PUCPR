document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.getElementById('copyright');
    const currentYear = new Date().getFullYear();                                                               // Com isso vai atualizar o ano automaticamente no footer

    copyrightElement.textContent = `© ${currentYear} João Pedro Macena Correa. Todos os direitos reservados.`;  // Vai atualizra o texto (ano) do rodapé
});
