document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.getElementById('copyright');
    const currentYear = new Date().getFullYear();                                                               // Com isso, vai fazer que "pegue" o ano que está no sistema e sempre atualizar

    copyrightElement.textContent = `© ${currentYear} João Pedro Macena Correa. Todos os direitos reservados.`;  // Vai atualizra o texto (ano) do rodapé
});
