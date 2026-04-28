// ======================== FUNÇÃO PARA CONVERTER LINK DO IB.BB ========================
function converterLinkIBB(link) {
    if (link.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i)) {
        return link;
    }
    const match = link.match(/ibb\.co\/([a-zA-Z0-9]+)/);
    if (match) {
        return `https://i.ibb.co/${match[1]}/imagem.jpg`;
    }
    const match2 = link.match(/i\.ibb\.co\/([a-zA-Z0-9]+)/);
    if (match2) {
        return `https://i.ibb.co/${match2[1]}/imagem.jpg`;
    }
    return link;
}

// ======================== SALVAR/CARREGAR ========================
let produtos = [];
let usuariosAdmin = [
    { login: "E32329", senha: "1234" }
];
let cupons = [];
let currentEditId = null;

function salvarDados() {
    localStorage.setItem("produtos_jv", JSON.stringify(produtos));
    localStorage.setItem("admins_jv", JSON.stringify(usuariosAdmin));
    localStorage.setItem("cupons_jv", JSON.stringify(cupons));
}

function carregarDados() {
    const saved = localStorage.getItem("produtos_jv");
    if (saved) {
        produtos = JSON.parse(saved);
    } else {
        produtos = [
            {
                id: 1,
                nome: "Camisa Flamengo 2025",
                categoria: "camisas_times",
                preco: 139.90,
                estoque: { P: 5, M: 8, G: 10, GG: 3 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Flamengo"],
                destaque: true
            },
            {
                id: 2,
                nome: "Camisa Brasil 2026",
                categoria: "camisas_times",
                preco: 129.90,
                estoque: { P: 3, M: 6, G: 8, GG: 2 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Brasil"],
                destaque: true
            }
        ];
    }
    
    const savedAdmins = localStorage.getItem("admins_jv");
    if (savedAdmins) usuariosAdmin = JSON.parse(savedAdmins);
    
    const savedCupons = localStorage.getItem("cupons_jv");
    if (savedCupons) {
        cupons = JSON.parse(savedCupons);
    } else {
        cupons = [
            { codigo: "DESCONTO10", valor: 10, tipo: "percentual" },
            { codigo: "DESCONTO20", valor: 20, tipo: "percentual" }
        ];
    }
}
carregarDados();

// ======================== VERIFICAR LOGIN ========================
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem("admin_logged");
    if (isLoggedIn === "true") {
        document.getElementById("loginArea").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        carregarProdutosLista();
        carregarCuponsLista();
        carregarAdminsLista();
    }
}

document.getElementById("loginBtn").onclick = () => {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;
    
    if (usuariosAdmin.some(u => u.login === user && u.senha === pass)) {
        sessionStorage.setItem("admin_logged", "true");
        document.getElementById("loginArea").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        carregarProdutosLista();
        carregarCuponsLista();
        carregarAdminsLista();
    } else {
        alert("❌ Login ou senha incorretos!");
    }
};

document.getElementById("logoutBtn").onclick = () => {
    sessionStorage.removeItem("admin_logged");
    location.reload();
};

// ======================== PRODUTOS ========================
function carregarProdutosLista() {
    const container = document.getElementById("produtosList");
    if (produtos.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888;'>Nenhum produto cadastrado. Clique em 'Novo Produto' para começar.</p>";
        return;
    }
    
    container.innerHTML = produtos.map(p => `
        <div class="produto-item">
            <div class="produto-info">
                <strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)}<br>
                <small>Categoria: ${p.categoria} | Destaque: ${p.destaque ? "✅ Sim" : "❌ Não"}</small><br>
                <small>📸 ${p.imagens.length} foto(s) | Estoque: P=${p.estoque.P} M=${p.estoque.M} G=${p.estoque.G} GG=${p.estoque.GG}</small>
            </div>
            <div class="produto-buttons">
                <button class="btn-edit" onclick="editarProduto(${p.id})">✏️ Editar</button>
                <button class="btn-delete" onclick="excluirProduto(${p.id})">🗑️ Excluir</button>
            </div>
        </div>
    `).join("");
}

window.editarProduto = (id) => {
    const p = produtos.find(x => x.id === id);
    if (!p) return;
    
    currentEditId = id;
    document.getElementById("prodNome").value = p.nome;
    document.getElementById("prodPreco").value = p.preco;
    document.getElementById("prodCategoria").value = p.categoria;
    document.getElementById("prodDestaque").value = p.destaque ? "true" : "false";
    document.getElementById("estoqueP").value = p.estoque.P;
    document.getElementById("estoqueM").value = p.estoque.M;
    document.getElementById("estoqueG").value = p.estoque.G;
    document.getElementById("estoqueGG").value = p.estoque.GG;
    document.getElementById("prodImagens").value = p.imagens.join("\n");
    document.getElementById("productFormArea").style.display = "block";
    document.getElementById("productFormArea").scrollIntoView({ behavior: "smooth" });
};

window.excluirProduto = (id) => {
    if (confirm("❓ Tem certeza que deseja excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        salvarDados();
        carregarProdutosLista();
        alert("✅ Produto excluído!");
    }
};

document.getElementById("showFormBtn").onclick = () => {
    currentEditId = null;
    document.getElementById("prodNome").value = "";
    document.getElementById("prodPreco").value = "";
    document.getElementById("prodCategoria").value = "camisas_times";
    document.getElementById("prodDestaque").value = "false";
    document.getElementById("estoqueP").value = "";
    document.getElementById("estoqueM").value = "";
    document.getElementById("estoqueG").value = "";
    document.getElementById("estoqueGG").value = "";
    document.getElementById("prodImagens").value = "";
    document.getElementById("productFormArea").style.display = "block";
    document.getElementById("productFormArea").scrollIntoView({ behavior: "smooth" });
};

document.getElementById("saveProductBtn").onclick = () => {
    const nome = document.getElementById("prodNome").value;
    const preco = parseFloat(document.getElementById("prodPreco").value);
    
    if (!nome || isNaN(preco)) {
        alert("❌ Preencha nome e preço do produto!");
        return;
    }
    
    const imagensTexto = document.getElementById("prodImagens").value;
    let imagens = [];
    
    if (imagensTexto.trim()) {
        imagens = imagensTexto.split("\n")
            .filter(s => s.trim().length > 0)
            .map(link => converterLinkIBB(link.trim()));
    } else {
        imagens = ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Sem+Imagem"];
    }
    
    const produtoData = {
        nome: nome,
        preco: preco,
        categoria: document.getElementById("prodCategoria").value,
        destaque: document.getElementById("prodDestaque").value === "true",
        estoque: {
            P: parseInt(document.getElementById("estoqueP").value) || 0,
            M: parseInt(document.getElementById("estoqueM").value) || 0,
            G: parseInt(document.getElementById("estoqueG").value) || 0,
            GG: parseInt(document.getElementById("estoqueGG").value) || 0
        },
        imagens: imagens
    };
    
    if (currentEditId) {
        const index = produtos.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            produtos[index] = { ...produtos[index], ...produtoData };
        }
        alert("✅ Produto editado com sucesso!");
    } else {
        produtoData.id = Date.now();
        produtos.push(produtoData);
        alert("✅ Produto cadastrado com sucesso!");
    }
    
    salvarDados();
    carregarProdutosLista();
    document.getElementById("productFormArea").style.display = "none";
    currentEditId = null;
};

document.getElementById("cancelFormBtn").onclick = () => {
    document.getElementById("productFormArea").style.display = "none";
    currentEditId = null;
};

// ======================== CUPONS ========================
function carregarCuponsLista() {
    const container = document.getElementById("cuponsList");
    if (cupons.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888;'>Nenhum cupom cadastrado.</p>";
        return;
    }
    
    container.innerHTML = cupons.map((c, idx) => `
        <div class="cupom-item">
            <div class="cupom-info">
                <strong>${c.codigo}</strong><br>
                <small>${c.tipo === "percentual" ? `${c.valor}% de desconto` : `R$ ${c.valor.toFixed(2)} de desconto`}</small>
            </div>
            <div class="cupom-buttons">
                <button class="btn-delete" onclick="excluirCupom(${idx})">🗑️ Excluir</button>
            </div>
        </div>
    `).join("");
}

window.excluirCupom = (index) => {
    if (confirm(`Excluir o cupom "${cupons[index].codigo}"?`)) {
        cupons.splice(index, 1);
        salvarDados();
        carregarCuponsLista();
        alert("✅ Cupom excluído!");
    }
};

document.getElementById("criarCupomBtn").onclick = () => {
    const codigo = document.getElementById("cupomCodigo").value.trim().toUpperCase();
    const tipo = document.querySelector('input[name="cupomTipo"]:checked').value;
    const valor = parseFloat(document.getElementById("cupomValor").value);
    
    if (!codigo) {
        alert("❌ Digite o código do cupom!");
        return;
    }
    
    if (isNaN(valor) || valor <= 0) {
        alert("❌ Digite um valor válido para o desconto!");
        return;
    }
    
    if (cupons.some(c => c.codigo === codigo)) {
        alert("❌ Já existe um cupom com este código!");
        return;
    }
    
    cupons.push({ codigo, valor, tipo });
    salvarDados();
    carregarCuponsLista();
    document.getElementById("cupomCodigo").value = "";
    document.getElementById("cupomValor").value = "";
    alert("✅ Cupom criado com sucesso!");
};

// ======================== ADMINISTRADORES ========================
function carregarAdminsLista() {
    const container = document.getElementById("adminsList");
    container.innerHTML = usuariosAdmin.map(u => `
        <div class="admin-list-item">
            <span><i class="fas fa-user-shield"></i> ${u.login}</span>
            ${u.login !== "E32329" ? `<button onclick="removerAdmin('${u.login}')" style="background:#dc3545; color:white; border:none; padding:6px 16px; border-radius:20px; cursor:pointer;">Remover</button>` : "<span style='color:#f0b90b'>🔒 Master</span>"}
        </div>
    `).join("");
}

window.removerAdmin = (login) => {
    if (confirm(`Remover administrador "${login}"?`)) {
        usuariosAdmin = usuariosAdmin.filter(u => u.login !== login);
        salvarDados();
        carregarAdminsLista();
        alert("✅ Administrador removido!");
    }
};

document.getElementById("criarAdminBtn").onclick = () => {
    const newLogin = document.getElementById("novoAdminLogin").value;
    const newSenha = document.getElementById("novoAdminSenha").value;
    
    if (!newLogin || !newSenha) {
        alert("❌ Preencha usuário e senha!");
        return;
    }
    
    if (usuariosAdmin.some(u => u.login === newLogin)) {
        alert("❌ Este usuário já existe!");
        return;
    }
    
    usuariosAdmin.push({ login: newLogin, senha: newSenha });
    salvarDados();
    carregarAdminsLista();
    document.getElementById("novoAdminLogin").value = "";
    document.getElementById("novoAdminSenha").value = "";
    alert("✅ Administrador criado!");
};

// TABS
document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        const tabName = tab.getAttribute("data-tab");
        document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add("active");
    };
});

// INICIAR
checkLogin();