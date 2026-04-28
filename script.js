// ======================== CARREGAR PRODUTOS DO LOCALSTORAGE ========================
let produtos = [];
let carrinho = [];
let currentCarrosselImgs = [];
let currentCarrosselIndex = 0;
let cupomAplicado = null;
let produtosFiltrados = [];
let cuponsDisponiveis = [];

function carregarCupons() {
    const saved = localStorage.getItem("cupons_jv");
    if (saved) {
        cuponsDisponiveis = JSON.parse(saved);
    } else {
        cuponsDisponiveis = [
            { codigo: "DESCONTO10", valor: 10, tipo: "percentual" },
            { codigo: "DESCONTO20", valor: 20, tipo: "percentual" }
        ];
    }
}

function salvarCupons() {
    localStorage.setItem("cupons_jv", JSON.stringify(cuponsDisponiveis));
}

function carregarProdutos() {
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
                imagens: [
                    "https://placehold.co/600x400/1a1a1a/f0b90b?text=Flamengo+1",
                    "https://placehold.co/600x400/1a1a1a/f0b90b?text=Flamengo+2",
                    "https://placehold.co/600x400/1a1a1a/f0b90b?text=Flamengo+3"
                ],
                destaque: true
            },
            {
                id: 2,
                nome: "Camisa Brasil 2026",
                categoria: "camisas_times",
                preco: 129.90,
                estoque: { P: 3, M: 6, G: 8, GG: 2 },
                imagens: [
                    "https://placehold.co/600x400/1a1a1a/f0b90b?text=Brasil+1",
                    "https://placehold.co/600x400/1a1a1a/f0b90b?text=Brasil+2"
                ],
                destaque: true
            },
            {
                id: 3,
                nome: "Camisa Esportiva Dry Fit",
                categoria: "camisas_esportivas",
                preco: 89.90,
                estoque: { P: 10, M: 12, G: 8, GG: 5 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Dry+Fit"],
                destaque: false
            },
            {
                id: 4,
                nome: "Shorts Esportivo Preto",
                categoria: "shorts_esportivos",
                preco: 59.90,
                estoque: { P: 8, M: 10, G: 7, GG: 4 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Shorts+Preto"],
                destaque: false
            },
            {
                id: 5,
                nome: "Calça Jogger Esportiva",
                categoria: "calcas",
                preco: 149.90,
                estoque: { P: 4, M: 6, G: 5, GG: 2 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Calça+Jogger"],
                destaque: true
            },
            {
                id: 6,
                nome: "Blusa de Frio Nike",
                categoria: "blusas",
                preco: 189.90,
                estoque: { P: 3, M: 5, G: 4, GG: 2 },
                imagens: ["https://placehold.co/600x400/1a1a1a/f0b90b?text=Blusa+Frio"],
                destaque: false
            }
        ];
    }
    produtosFiltrados = [...produtos];
}

// ======================== FILTROS (apenas para páginas de categoria) ========================
function aplicarFiltros() {
    const precoMin = parseFloat(document.getElementById("filtroPrecoMin")?.value) || 0;
    const precoMax = parseFloat(document.getElementById("filtroPrecoMax")?.value) || Infinity;
    const tamanho = document.getElementById("filtroTamanho")?.value;
    
    produtosFiltrados = produtos.filter(p => {
        if (p.preco < precoMin || p.preco > precoMax) return false;
        if (tamanho && p.estoque[tamanho] === 0) return false;
        return true;
    });
    
    const paginaAtual = document.querySelector(".nav-btn.active")?.getAttribute("data-page") || "home";
    if (paginaAtual !== "home") {
        renderizarPagina(paginaAtual);
    }
}

function limparFiltros() {
    if (document.getElementById("filtroPrecoMin")) document.getElementById("filtroPrecoMin").value = "";
    if (document.getElementById("filtroPrecoMax")) document.getElementById("filtroPrecoMax").value = "";
    if (document.getElementById("filtroTamanho")) document.getElementById("filtroTamanho").value = "";
    produtosFiltrados = [...produtos];
    const paginaAtual = document.querySelector(".nav-btn.active")?.getAttribute("data-page") || "home";
    if (paginaAtual !== "home") {
        renderizarPagina(paginaAtual);
    }
}

// ======================== RENDERIZAR PÁGINA ========================
function renderizarPagina(categoria) {
    const main = document.getElementById("main-content");
    
    if (categoria === "home") {
        const destaques = produtos.filter(p => p.destaque);
        main.innerHTML = `
            <div class="about-section">
                <div class="about-content">
                    <h2 class="about-title">QUEM SOMOS</h2>
                    <div class="about-text">
                        <p>A <strong>JV Multimarcas</strong> nasceu da paixão pelo esporte e pelo estilo autêntico que ele representa. Fundada em 2020, nossa loja surgiu com um propósito claro: oferecer artigos esportivos de alta qualidade com preços justos e acessíveis para todos os brasileiros.</p>
                        <p>Especializados em <strong>camisas de times, shorts esportivos, calças e blusas de frio</strong>, trabalhamos apenas com fornecedores selecionados que garantem tecidos duráveis, conforto e caimento perfeito. Cada produto em nosso catálogo passa por uma rigorosa avaliação de qualidade antes de chegar até você.</p>
                        <p>Nosso diferencial está no <strong>atendimento próximo e humanizado</strong>. Acreditamos que comprar roupa esportiva vai além da simples transação comercial - é sobre vestir sua torcida, expressar sua identidade e se sentir confiante para praticar o esporte que você ama.</p>
                        <p>Hoje, atendemos clientes de todo o Brasil através da nossa loja online, sempre com compromisso na entrega e transparência em cada etapa da compra. Seja para jogar futebol com os amigos, treinar na academia ou apenas demonstrar seu amor pelo time do coração, a <strong>JV Multimarcas</strong> está aqui para vestir sua paixão.</p>
                        <p>Nossa trajetória é construída com base na <strong>confiança</strong> de quem nos escolhe. Cada cliente que veste uma de nossas peças se torna parte da nossa história, e é por isso que trabalhamos incansavelmente para superar expectativas a cada entrega.</p>
                        <p>Além da qualidade dos produtos, investimos em uma <strong>logística eficiente</strong> para que seu pedido chegue no prazo, embalado com cuidado e pronto para uso. Não medimos esforços para que sua experiência de compra seja simples, segura e satisfatória.</p>
                        <p>Convidamos você a <strong>conhecer nosso catálogo</strong> e descobrir por que tantos clientes confiam na JV Multimarcas para vestir seus momentos esportivos. Estamos prontos para atender você com todo carinho e profissionalismo que você merece!</p>
                    </div>
                    <div class="mvv-container">
                        <div class="mvv-item">
                            <i class="fas fa-bullseye"></i>
                            <h4>Missão</h4>
                            <p>Vestir atletas e torcedores com produtos esportivos de qualidade, tornando o esporte mais acessível e estiloso.</p>
                        </div>
                        <div class="mvv-item">
                            <i class="fas fa-eye"></i>
                            <h4>Visão</h4>
                            <p>Ser referência nacional em moda esportiva até 2028, reconhecida pela excelência e inovação.</p>
                        </div>
                        <div class="mvv-item">
                            <i class="fas fa-heart"></i>
                            <h4>Valores</h4>
                            <p>Qualidade, respeito ao cliente, agilidade, transparência e paixão pelo esporte.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="destaque-wrapper">
                <h2 class="section-title">PRODUTOS EM DESTAQUE</h2>
                <div class="products-grid" id="destaquesGrid"></div>
            </div>
            
            <div class="feedback-section">
                <h2 class="section-title">O QUE NOSSOS CLIENTES DIZEM</h2>
                <div class="feedbacks-grid">
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Cliente">
                        <p>"Comprei minha camisa do Flamengo e chegou antes do prazo! Qualidade incrível!"</p>
                        <h4>Carlos Silva</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Cliente">
                        <p>"Atendimento excelente, troquei o tamanho sem burocracia. Recomendo demais!"</p>
                        <h4>Mariana Souza</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Cliente">
                        <p>"Melhor loja de artigos esportivos que já comprei. Preço justo!"</p>
                        <h4>Rafael Oliveira</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/women/25.jpg" alt="Cliente">
                        <p>"Blusa de frio maravilhosa! Super quentinha. Adorei!"</p>
                        <h4>Fernanda Lima</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="Cliente">
                        <p>"Já fiz mais de 10 compras. Produtos de altíssima qualidade!"</p>
                        <h4>Roberto Almeida</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                    <div class="feedback-card">
                        <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Cliente">
                        <p>"Presenteei meu marido e ele amou! Voltarei com certeza."</p>
                        <h4>Patrícia Costa</h4>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>
            </div>
        `;
        
        const grid = document.getElementById("destaquesGrid");
        if (grid) {
            if (destaques.length === 0) {
                grid.innerHTML = '<p class="sem-resultados">Nenhum produto em destaque no momento.</p>';
            } else {
                destaques.forEach(p => grid.appendChild(criarCardProduto(p)));
            }
        }
        return;
    }
    
    const titulos = {
        camisas_times: "Camisas de Times",
        camisas_esportivas: "Camisas Esportivas",
        shorts_times: "Shorts de Time",
        shorts_esportivos: "Shorts Esportivos",
        calcas: "Calça Esportiva",
        blusas: "Blusa de Frio Esportiva"
    };
    
    const filtrados = produtosFiltrados.filter(p => p.categoria === categoria);
    main.innerHTML = `
        <div class="filtros-container">
            <h3 class="filtros-titulo">🔍 Filtrar Produtos</h3>
            <div class="filtros-row">
                <div class="filtro-group">
                    <label>Preço mínimo (R$)</label>
                    <input type="number" id="filtroPrecoMin" placeholder="0" step="10">
                </div>
                <div class="filtro-group">
                    <label>Preço máximo (R$)</label>
                    <input type="number" id="filtroPrecoMax" placeholder="1000" step="10">
                </div>
                <div class="filtro-group">
                    <label>Tamanho disponível</label>
                    <select id="filtroTamanho">
                        <option value="">Todos</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                    </select>
                </div>
                <div class="filtro-group">
                    <button id="aplicarFiltrosBtn">Aplicar Filtros</button>
                </div>
                <div class="filtro-group">
                    <button id="limparFiltrosBtn" style="background:#6c757d;">Limpar</button>
                </div>
            </div>
        </div>
        <h2 style="margin-bottom:1rem;">${titulos[categoria]}</h2>
        <div class="products-grid" id="categoryGrid"></div>
    `;
    
    const grid = document.getElementById("categoryGrid");
    if (filtrados.length === 0) {
        grid.innerHTML = '<p class="sem-resultados">Nenhum produto encontrado com os filtros selecionados.</p>';
    } else {
        filtrados.forEach(p => grid.appendChild(criarCardProduto(p)));
    }
    
    document.getElementById("aplicarFiltrosBtn")?.addEventListener("click", aplicarFiltros);
    document.getElementById("limparFiltrosBtn")?.addEventListener("click", limparFiltros);
}

function criarCardProduto(p) {
    const card = document.createElement("div");
    card.className = "product-card";
    const primeiraImg = (p.imagens && p.imagens[0]) ? p.imagens[0] : "https://placehold.co/600x400/1a1a1a/f0b90b?text=Sem+Imagem";
    
    const tamanhos = Object.keys(p.estoque);
    const options = tamanhos.map(t => `<option value="${t}">${t} (${p.estoque[t]})</option>`).join("");
    
    card.innerHTML = `
        <img src="${primeiraImg}" class="product-img" data-id="${p.id}">
        <div class="product-info">
            <h3>${p.nome}</h3>
            <div class="product-price">R$ ${p.preco.toFixed(2)}</div>
            <div class="product-size">
                <label>Tamanho:</label>
                <select class="size-select" data-id="${p.id}">${options}</select>
            </div>
            <div class="stock-info" id="stock-${p.id}">✅ Estoque disponível</div>
            <div class="product-buttons">
                <button class="add-cart" data-id="${p.id}">Adicionar</button>
                <button class="view-gallery" data-id="${p.id}">Ver fotos (${p.imagens.length})</button>
            </div>
        </div>
    `;
    
    const select = card.querySelector(".size-select");
    const stockSpan = card.querySelector(`#stock-${p.id}`);
    select.addEventListener("change", () => {
        const tam = select.value;
        const qtd = p.estoque[tam];
        stockSpan.innerHTML = qtd > 0 ? `✅ Estoque: ${qtd} unidades` : "❌ Esgotado!";
    });
    select.dispatchEvent(new Event("change"));
    
    card.querySelector(".add-cart").addEventListener("click", () => adicionarAoCarrinho(p.id, select.value));
    
    const btnGaleria = card.querySelector(".view-gallery");
    const imgProduto = card.querySelector(".product-img");
    
    btnGaleria.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirCarrossel(p.imagens, 0);
    });
    
    imgProduto.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirCarrossel(p.imagens, 0);
    });
    
    return card;
}

function adicionarAoCarrinho(id, tamanho) {
    const prod = produtos.find(p => p.id === id);
    if (!prod || prod.estoque[tamanho] <= 0) {
        alert("❌ Estoque indisponível!");
        return;
    }
    const existente = carrinho.find(i => i.id === id && i.tamanho === tamanho);
    if (existente) {
        existente.qtd++;
    } else {
        carrinho.push({ id: prod.id, nome: prod.nome, preco: prod.preco, tamanho: tamanho, qtd: 1 });
    }
    atualizarCarrinhoContador();
    alert(`✅ ${prod.nome} (${tamanho}) adicionado!`);
}

function atualizarCarrinhoContador() {
    const total = carrinho.reduce((s, i) => s + i.qtd, 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.innerText = total;
}

function limparCarrinho() {
    if (carrinho.length === 0) {
        alert("Carrinho já está vazio!");
        return;
    }
    if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        carrinho = [];
        cupomAplicado = null;
        atualizarCarrinhoContador();
        mostrarCarrinho();
        alert("✅ Carrinho limpo com sucesso!");
    }
}

function aplicarCupom() {
    const codigo = document.getElementById("codigoCupom").value.trim().toUpperCase();
    const statusDiv = document.getElementById("cupomStatus");
    
    if (!codigo) {
        statusDiv.innerHTML = "Digite um código de cupom";
        statusDiv.className = "cupom-status erro";
        return;
    }
    
    const cupom = cuponsDisponiveis.find(c => c.codigo.toUpperCase() === codigo);
    
    if (!cupom) {
        statusDiv.innerHTML = "❌ Cupom inválido!";
        statusDiv.className = "cupom-status erro";
        cupomAplicado = null;
    } else {
        cupomAplicado = cupom;
        let descontoTexto = "";
        if (cupom.tipo === "percentual") {
            descontoTexto = `${cupom.valor}% de desconto`;
        } else if (cupom.tipo === "fixo") {
            descontoTexto = `R$ ${cupom.valor.toFixed(2)} de desconto`;
        }
        statusDiv.innerHTML = `✅ Cupom aplicado! ${descontoTexto}`;
        statusDiv.className = "cupom-status sucesso";
    }
    atualizarResumoPedido();
}

function abrirCarrossel(imagens, startIndex) {
    if (!imagens || imagens.length === 0) {
        alert("Este produto não tem fotos cadastradas.");
        return;
    }
    
    currentCarrosselImgs = imagens;
    currentCarrosselIndex = startIndex;
    
    const imgElement = document.getElementById("carrosselImage");
    const contador = document.getElementById("carrosselContador");
    const modal = document.getElementById("carrosselModal");
    
    if (imgElement) imgElement.src = imagens[startIndex];
    if (contador) contador.innerText = `${startIndex + 1} / ${imagens.length}`;
    if (modal) modal.style.display = "flex";
}

function configurarCarrossel() {
    const prevBtn = document.getElementById("carrosselPrev");
    const nextBtn = document.getElementById("carrosselNext");
    const closeBtn = document.getElementById("closeCarrossel");
    const modal = document.getElementById("carrosselModal");
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            if (currentCarrosselImgs.length > 0) {
                currentCarrosselIndex = (currentCarrosselIndex - 1 + currentCarrosselImgs.length) % currentCarrosselImgs.length;
                const imgElement = document.getElementById("carrosselImage");
                const contador = document.getElementById("carrosselContador");
                if (imgElement) imgElement.src = currentCarrosselImgs[currentCarrosselIndex];
                if (contador) contador.innerText = `${currentCarrosselIndex + 1} / ${currentCarrosselImgs.length}`;
            }
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            if (currentCarrosselImgs.length > 0) {
                currentCarrosselIndex = (currentCarrosselIndex + 1) % currentCarrosselImgs.length;
                const imgElement = document.getElementById("carrosselImage");
                const contador = document.getElementById("carrosselContador");
                if (imgElement) imgElement.src = currentCarrosselImgs[currentCarrosselIndex];
                if (contador) contador.innerText = `${currentCarrosselIndex + 1} / ${currentCarrosselImgs.length}`;
            }
        };
    }
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            if (modal) modal.style.display = "none";
        };
    }
    
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = "none";
        };
    }
}

function mostrarCarrinho() {
    const cartDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("cartTotal");
    
    if (carrinho.length === 0) {
        cartDiv.innerHTML = "<p style='text-align:center'>🛒 Carrinho vazio</p>";
        totalDiv.innerHTML = "";
    } else {
        cartDiv.innerHTML = carrinho.map((item, idx) => `
            <div class="cart-item">
                <span><strong>${item.nome}</strong> (${item.tamanho}) x${item.qtd}</span>
                <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
                <button onclick="removerItemCarrinho(${idx})" style="background:#dc3545; border:none; color:white; padding:4px 12px; border-radius:20px; cursor:pointer;">X</button>
            </div>
        `).join("");
        const total = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
        totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    }
    document.getElementById("cartModal").style.display = "flex";
}

window.removerItemCarrinho = (idx) => {
    carrinho.splice(idx, 1);
    atualizarCarrinhoContador();
    mostrarCarrinho();
};

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("❌ Carrinho vazio!");
        return;
    }
    cupomAplicado = null;
    document.getElementById("codigoCupom").value = "";
    document.getElementById("cupomStatus").innerHTML = "";
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("checkoutModal").style.display = "flex";
    atualizarResumoPedido();
}

function atualizarResumoPedido() {
    const resumoDiv = document.getElementById("resumoItens");
    const subtotalDiv = document.getElementById("resumoSubtotal");
    const descontoDiv = document.getElementById("resumoDesconto");
    const totalDiv = document.getElementById("resumoTotal");
    
    const subtotal = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
    let desconto = 0;
    let total = subtotal;
    
    if (cupomAplicado && cupomAplicado.tipo === "percentual") {
        desconto = (subtotal * cupomAplicado.valor) / 100;
        total = subtotal - desconto;
    } else if (cupomAplicado && cupomAplicado.tipo === "fixo") {
        desconto = Math.min(cupomAplicado.valor, subtotal);
        total = subtotal - desconto;
    }
    
    if (resumoDiv) {
        resumoDiv.innerHTML = carrinho.map(i => `
            <div class="resumo-item">${i.nome} (${i.tamanho}) x${i.qtd} = R$ ${(i.preco * i.qtd).toFixed(2)}</div>
        `).join("");
    }
    if (subtotalDiv) subtotalDiv.innerHTML = `<strong>Subtotal:</strong> R$ ${subtotal.toFixed(2)}`;
    if (descontoDiv) {
        if (desconto > 0) {
            descontoDiv.innerHTML = `<strong>Desconto:</strong> -R$ ${desconto.toFixed(2)}`;
        } else {
            descontoDiv.innerHTML = "";
        }
    }
    if (totalDiv) totalDiv.innerHTML = `<strong style="font-size:1.2rem;">Total: R$ ${total.toFixed(2)}</strong>`;
}

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

let cepTimeout;
function buscarEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                document.getElementById("cepStatus").innerHTML = '<span style="color:#dc3545;">❌ CEP não encontrado!</span>';
                return;
            }
            document.getElementById("rua").value = dados.logradouro || "";
            document.getElementById("bairro").value = dados.bairro || "";
            document.getElementById("cidade").value = dados.localidade || "";
            document.getElementById("estado").value = dados.uf || "";
            document.getElementById("cepStatus").innerHTML = '<span style="color:#28a745;">✅ Endereço encontrado!</span>';
            document.getElementById("enderecoCompleto").style.display = "block";
        })
        .catch(() => {
            document.getElementById("cepStatus").innerHTML = '<span style="color:#dc3545;">❌ Erro ao buscar!</span>';
        });
}

function calcularTroco() {
    const pagamento = document.getElementById("pagamento").value;
    let total = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
    
    if (cupomAplicado) {
        if (cupomAplicado.tipo === "percentual") {
            total = total - (total * cupomAplicado.valor / 100);
        } else if (cupomAplicado.tipo === "fixo") {
            total = total - Math.min(cupomAplicado.valor, total);
        }
    }
    
    const valorRecebido = parseFloat(document.getElementById("valorRecebido")?.value) || 0;
    const trocoDiv = document.getElementById("trocoInfo");
    
    if (pagamento === "dinheiro" && valorRecebido > 0) {
        if (valorRecebido >= total) {
            const troco = valorRecebido - total;
            trocoDiv.innerHTML = `💰 Troco: R$ ${troco.toFixed(2)}`;
        } else {
            trocoDiv.innerHTML = `⚠️ Valor insuficiente. Faltam R$ ${(total - valorRecebido).toFixed(2)}`;
        }
    } else {
        trocoDiv.innerHTML = "";
    }
}

// Eventos do Checkout
document.getElementById("cartBtn").onclick = mostrarCarrinho;
document.getElementById("finalizarCompraBtn").onclick = finalizarCompra;
document.getElementById("limparCarrinhoBtn").onclick = limparCarrinho;
document.getElementById("aplicarCupomBtn")?.addEventListener("click", aplicarCupom);

const cpfInput = document.getElementById("clienteCpf");
if (cpfInput) {
    cpfInput.addEventListener("input", function(e) {
        this.value = formatarCPF(this.value);
    });
}

const pagamentoSelect = document.getElementById("pagamento");
if (pagamentoSelect) {
    pagamentoSelect.addEventListener("change", function() {
        const trocoSection = document.getElementById("trocoSection");
        trocoSection.style.display = this.value === "dinheiro" ? "block" : "none";
        calcularTroco();
        
        let total = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
        if (cupomAplicado) {
            if (cupomAplicado.tipo === "percentual") {
                total = total - (total * cupomAplicado.valor / 100);
            } else if (cupomAplicado.tipo === "fixo") {
                total = total - Math.min(cupomAplicado.valor, total);
            }
        }
        
        const parcelasDiv = document.getElementById("parcelasGroup");
        
        if (this.value === "credito" && total >= 100 && parcelasDiv) {
            parcelasDiv.style.display = "block";
            const selectParcelas = document.getElementById("parcelas");
            if (selectParcelas) {
                selectParcelas.innerHTML = `<option value="1">1x de R$ ${total.toFixed(2)} (sem juros)</option>
                                            <option value="2">2x de R$ ${(total/2).toFixed(2)} (sem juros)</option>
                                            <option value="3">3x de R$ ${(total/3).toFixed(2)} (sem juros)</option>`;
                for (let i = 4; i <= 10; i++) {
                    const acrescimo = (i - 3) * 5;
                    const valorParcela = (total + acrescimo) / i;
                    selectParcelas.innerHTML += `<option value="${i}">${i}x de R$ ${valorParcela.toFixed(2)} (acréscimo R$ ${acrescimo})</option>`;
                }
            }
        } else if (parcelasDiv) {
            parcelasDiv.style.display = "none";
        }
    });
}

const valorRecebidoInput = document.getElementById("valorRecebido");
if (valorRecebidoInput) {
    valorRecebidoInput.addEventListener("input", calcularTroco);
}

const tipoEntregaSelect = document.getElementById("tipoEntrega");
if (tipoEntregaSelect) {
    tipoEntregaSelect.addEventListener("change", function() {
        const enderecoSection = document.getElementById("enderecoSection");
        const retiradaSection = document.getElementById("retiradaSection");
        if (enderecoSection) enderecoSection.style.display = this.value === "entrega" ? "block" : "none";
        if (retiradaSection) retiradaSection.style.display = this.value === "retirada" ? "block" : "none";
    });
}

const cepField = document.getElementById("cep");
if (cepField) {
    cepField.addEventListener("input", function() {
        clearTimeout(cepTimeout);
        cepTimeout = setTimeout(() => {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) buscarEndereco(cep);
        }, 500);
    });
}

const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        
        const nome = document.getElementById("clienteNome").value;
        const cpf = document.getElementById("clienteCpf").value;
        const telefone = document.getElementById("clienteTelefone").value;
        const tipoEntrega = document.getElementById("tipoEntrega").value;
        const pagamento = document.getElementById("pagamento").value;
        const parcelas = document.getElementById("parcelas")?.value || "1";
        const observacao = document.getElementById("observacao").value;
        
        if (!nome || !cpf || !telefone || !tipoEntrega || !pagamento) {
            alert("❌ Preencha todos os campos obrigatórios!");
            return;
        }
        
        let entregaInfo = "";
        let trocoInfo = "";
        
        if (tipoEntrega === "entrega") {
            const cep = document.getElementById("cep").value;
            const numero = document.getElementById("numero").value;
            if (!cep || !numero) {
                alert("❌ Preencha CEP e número!");
                return;
            }
            const rua = document.getElementById("rua").value;
            const bairro = document.getElementById("bairro").value;
            const cidade = document.getElementById("cidade").value;
            const estado = document.getElementById("estado").value;
            const complemento = document.getElementById("complemento").value;
            entregaInfo = `${rua}, ${numero}${complemento ? `, ${complemento}` : ''} - ${bairro}, ${cidade}/${estado} - CEP: ${cep}`;
        } else {
            entregaInfo = "Retirada na Loja - Rua Exemplo, 123 - Centro - Juiz de Fora/MG";
        }
        
        let subtotal = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
        let desconto = 0;
        let total = subtotal;
        
        if (cupomAplicado) {
            if (cupomAplicado.tipo === "percentual") {
                desconto = (subtotal * cupomAplicado.valor) / 100;
                total = subtotal - desconto;
            } else if (cupomAplicado.tipo === "fixo") {
                desconto = Math.min(cupomAplicado.valor, subtotal);
                total = subtotal - desconto;
            }
        }
        
        let acrescimo = 0;
        let parcelasTexto = "";
        
        if (pagamento === "credito" && total >= 100) {
            const parcelasNum = parseInt(parcelas);
            if (parcelasNum > 3) {
                acrescimo = (parcelasNum - 3) * 5;
                total += acrescimo;
                parcelasTexto = ` em ${parcelasNum}x (acréscimo de R$ ${acrescimo})`;
            } else {
                parcelasTexto = ` em ${parcelasNum}x sem juros`;
            }
        }
        
        if (pagamento === "dinheiro") {
            const valorRecebido = parseFloat(document.getElementById("valorRecebido")?.value) || 0;
            if (valorRecebido > 0 && valorRecebido >= total) {
                const troco = valorRecebido - total;
                trocoInfo = `\nTroco para o cliente: R$ ${troco.toFixed(2)}`;
            } else if (valorRecebido > 0 && valorRecebido < total) {
                trocoInfo = `\n⚠️ Cliente pagará R$ ${valorRecebido.toFixed(2)} e ficará devendo R$ ${(total - valorRecebido).toFixed(2)}`;
            }
        }
        
        const itensTexto = carrinho.map(i => {
            return `${i.nome} (${i.tamanho}) x${i.qtd} = R$ ${(i.preco * i.qtd).toFixed(2)}`;
        }).join("\n");
        
        const mensagem = 
`*NOVO PEDIDO - JV MULTIMARCAS*

Cliente: ${nome}
CPF: ${cpf}
Telefone: ${telefone}

*ITENS DO PEDIDO:*
${itensTexto}

*VALORES:*
Subtotal: R$ ${subtotal.toFixed(2)}
${desconto > 0 ? `Desconto: -R$ ${desconto.toFixed(2)}\n` : ''}${acrescimo > 0 ? `Acréscimo: R$ ${acrescimo}\n` : ''}Total: R$ ${total.toFixed(2)}${trocoInfo}

*PAGAMENTO:*
${pagamento.toUpperCase()}${parcelasTexto}

*ENTREGA:*
${entregaInfo}

${observacao ? `*OBSERVAÇÃO:*\n${observacao}` : ''}

Aguardamos confirmação do pedido.`;
        
        const msgCodificada = encodeURIComponent(mensagem);
        window.open(`https://wa.me/5532984641252?text=${msgCodificada}`, "_blank");
        
        carrinho = [];
        cupomAplicado = null;
        atualizarCarrinhoContador();
        document.getElementById("checkoutModal").style.display = "none";
        alert("✅ Pedido enviado! Em breve entraremos em contato.");
    };
}

// ======================== ADMIN ACCESS ========================
const adminBtn = document.getElementById("adminAccessBtn");
if (adminBtn) {
    adminBtn.onclick = () => {
        window.open("admin.html", "_blank");
    };
}

// ======================== BOTÃO VOLTAR AO TOPO ========================
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ======================== FECHAR MODAIS ========================
document.querySelectorAll(".close-modal").forEach(el => {
    el.onclick = () => {
        document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
    };
});

// ======================== NAVEGAÇÃO ========================
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderizarPagina(btn.getAttribute("data-page"));
    };
});

// ======================== INICIAR ========================
carregarCupons();
carregarProdutos();
renderizarPagina("home");
atualizarCarrinhoContador();
configurarCarrossel();