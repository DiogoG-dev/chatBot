const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa o cliente
const client = new Client({
    authStrategy: new LocalAuth()
});

let userState = {}; // Controle de estado para cada usuário

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.once('ready', () => {
    console.log('O Beto está pronto para trabalhar!');
});

// Inicializa o cliente
client.initialize();

client.on('message', async (message) => {
    const userId = message.from; // Identifica o usuário pelo número
    const userMessage = message.body.trim().toLowerCase();

    // Verifica se o comando exato "menu" foi digitado
    // /(menu|dia|tarde|noite|oi|olá|ola|opa)/i.test(userMessage)
    // userMessage === 'menu'
    if (/(menu|dia|tarde|noite|oi|olá|ola|opa)/i.test(userMessage)) {
        userState[userId] = 'main_menu'; // Define o estado como menu principal
        await client.sendMessage(
            userId,
            `Bem-vindo à loja *Roberto Motos!*\nEu sou o Beto e estou aqui para te ajudar! 😃\n
📦 *Nosso E-commerce*:\n[ www.robertomotos.com.br ]\n
📍 *Localização*:\nRua Tiburtino Inácio, 166 - São Francisco, Brejo Santo - CE, 63260-000\n
🕧 *Horário de Funcionamento*:\nSegunda á Sexta 07:30 - 17:00 e Sábado 07:30 - 12:00\n
Por favor, escolha uma opção digitando o número correspondente:\n
1️⃣ - Ver Produtos
2️⃣ - Contato dos Vendedores
3️⃣ - Falar com Atendente`
        );
    } 
    
    // Verifica se o usuário está em algum submenu
    else if (userState[userId] === 'main_menu') {
        if (userMessage === '1') {
            userState[userId] = 'product_menu'; // Define o estado como submenu de produtos
            await client.sendMessage(
                userId,
                `Escolha a categoria do produto digitando o número correspondente:\n
1️⃣ - Transmissão
2️⃣ - Acessórios
3️⃣ - Capacetes
4️⃣ - Ferramentas
5️⃣ - Guidão
6️⃣ - Lubrificantes\n
Ou "*menu*" para voltar ao início. 😊`
            );
        } else if (userMessage === '2') {
            userState[userId] = 'contact_menu'
            await client.sendMessage(
                userId,
                `📞 *Contato dos Vendedores:*\n
- João: +55 11 99999-9999\n
- Maria: +55 11 88888-8888\n
Ou digite "*menu*" para voltar ao menu principal.`
            );
        } else if (userMessage === '3') {
            userState[userId] = 'attendant_mode'; // Ativa o modo atendente
            await client.sendMessage(
                userId,
                `Por favor, aguarde. Um de nossos colaboradores irá atendê-lo em breve! 😊\n\nPara agilizar o atendimento, nos informe:\n🔸 Sobre qual produto deseja informação?\n🔸 Qual a marca do produto?\n🔸 Qual o modelo e o ano de fabricação da sua moto?\n\nOu, se preferir, digite "*menu*" para voltar ao início.`
            );
        }
    } 
    
    // Verifica se o usuário está em algum submenu de produtos
    else if (userState[userId] === 'product_menu') {
        if (userMessage === '1') {
            await client.sendMessage(
                userId,
                `⚙ *Transmissão:*\n[ www.robertomotos.com.br/transmissao10 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        } else if (userMessage === '2') {
            await client.sendMessage(
                userId,
                `🏁 *Acessórios:*\n[ www.robertomotos.com.br/acessorios17 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        } else if (userMessage === '3') {
            await client.sendMessage(
                userId,
                `⛑ *Capacetes:*\n[ www.robertomotos.com.br/capacetes18 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        } else if (userMessage === '4') {
            await client.sendMessage(
                userId,
                `🧰 *Ferramentas:*\n[ www.robertomotos.com.br/ferramentas210 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        } else if (userMessage === '5') {
            await client.sendMessage(
                userId,
                `🏍 *Guidão:*\n[ www.robertomotos.com.br/guidao201 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        } else if (userMessage === '6') {
            await client.sendMessage(
                userId,
                `🛢️ *Lubrificantes:*\n[ www.robertomotos.com.br/lubrificantes68 ]\n\nDigite "*menu*" para voltar ao menu inicial.`
            );
        }
    }
});
