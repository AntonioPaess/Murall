(function () {
    function initMurallBanners() {
        // Encontrar o contêiner do banner
        const bannerContainer = document.querySelector('.murall-banner');
        if (!bannerContainer) {
            console.warn('Murall: Container .murall-banner não encontrado na página.');
            return;
        }

        // Obter o domínio do blog a partir do atributo data-murall-blog-domain
        const blogDomain = bannerContainer.getAttribute('data-murall-blog-domain');
        if (!blogDomain || blogDomain === 'SEU_DOMINIO_DO_BLOG') {
            bannerContainer.innerHTML = '<p style="color:#94A3B8;text-align:center;">Configure o domínio do seu blog para ver os banners dos parceiros.</p>';
            console.warn('Murall: Domínio do blog não configurado corretamente no atributo data-murall-blog-domain.');
            return;
        }

        // URL da API (ajuste para a URL real do seu backend em produção)
        const API_BASE_URL = 'https://teste-murall-veros.onrender.com/api';
        
        // Mostrar estado de carregamento
        bannerContainer.innerHTML = '<p style="color:#94A3B8;text-align:center;">Carregando banners de parceiros...</p>';

        // Fazer a requisição para o endpoint que retorna os parceiros por domínio
        fetch(`${API_BASE_URL}/partnerships/blog/domain/${encodeURIComponent(blogDomain)}/partners`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(partners => {
            console.log('Murall: Parceiros recebidos:', partners);

            if (!partners || partners.length === 0) {
                bannerContainer.innerHTML = '<p style="color:#94A3B8;text-align:center;">Este blog ainda não tem parceiros.</p>';
                return;
            }

            // Coletar todas as URLs de banners dos parceiros
            const allBanners = [];
            partners.forEach(partner => {
                if (partner.bannerImageUrls && partner.bannerImageUrls.length > 0) {
                    partner.bannerImageUrls.forEach(url => {
                        allBanners.push({
                            imageUrl: url,
                            blogName: partner.blogName,
                            blogDomain: partner.blogDomain,
                            blogId: partner.blogId
                        });
                    });
                }
            });

            console.log('Murall: Banners processados:', allBanners);

            if (allBanners.length === 0) {
                bannerContainer.innerHTML = '<p style="color:#94A3B8;text-align:center;">Os blogs parceiros não têm banners para mostrar.</p>';
                return;
            }

            // Embaralhar o array de banners para ordem aleatória
            shuffleArray(allBanners);

            // Limpar o contêiner
            bannerContainer.innerHTML = '';

            // Configurações do carrossel
            let currentIndex = 0;
            const rotationInterval = 3000; // 3 segundos por banner
            
            // Criar o container do card principal
            const cardContainer = document.createElement('div');
            cardContainer.style.width = '490px';
            cardContainer.style.backgroundColor = 'transparent'; // Fundo transparente
            cardContainer.style.borderRadius = '8px';
            cardContainer.style.overflow = 'hidden';
            cardContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            cardContainer.style.margin = '0 auto';
            cardContainer.style.position = 'relative'; // Para posicionamento absoluto dos banners
            bannerContainer.appendChild(cardContainer);

            // Criar contêiner para a animação do carrossel
            const carouselContainer = document.createElement('div');
            carouselContainer.style.position = 'relative';
            carouselContainer.style.width = '100%';
            carouselContainer.style.overflow = 'hidden';
            cardContainer.appendChild(carouselContainer);

            // Criar apenas um slot de banner visível
            const bannerSlot = document.createElement('div');
            bannerSlot.style.position = 'relative';
            bannerSlot.style.width = '100%';
            bannerSlot.style.transition = 'opacity 0.8s ease-in-out';
            carouselContainer.appendChild(bannerSlot);

            function createBannerContent(banner) {
                // Criar elemento de link
                const link = document.createElement('a');
                link.href = banner.blogDomain.startsWith('http') 
                    ? banner.blogDomain 
                    : `https://${banner.blogDomain}`;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.display = 'block';
                link.style.textDecoration = 'none';
                
                // Criar contêiner para a imagem
                const imageContainer = document.createElement('div');
                imageContainer.style.padding = '10px'; 
                imageContainer.style.textAlign = 'center';
                imageContainer.style.position = 'relative';
                
                // Criar elemento de imagem
                const img = document.createElement('img');
                img.src = banner.imageUrl;
                img.alt = `${banner.blogName} - Blog parceiro Murall`;
                img.style.width = '468px';
                img.style.height = '100px';
                img.style.borderRadius = '6px';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
                img.style.display = 'block';
                img.style.margin = '0 auto';
                
                // Adicionar marca "Powered by Murall" na imagem
                const poweredBy = document.createElement('div');
                poweredBy.textContent = 'Powered by Murall';
                poweredBy.style.position = 'absolute';
                poweredBy.style.bottom = '15px';
                poweredBy.style.right = '20px';
                poweredBy.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                poweredBy.style.padding = '3px 8px';
                poweredBy.style.borderRadius = '4px';
                poweredBy.style.fontSize = '10px';
                poweredBy.style.fontWeight = '500';
                poweredBy.style.color = '#333';
                
                // Adicionar imagem e marca ao contêiner
                imageContainer.appendChild(img);
                imageContainer.appendChild(poweredBy);
                link.appendChild(imageContainer);
                
                return link;
            }

            function updateBanner() {
                const banner = allBanners[currentIndex];
                
                // Fade out do banner atual
                bannerSlot.style.opacity = '0';
                
                setTimeout(() => {
                    // Atualizar conteúdo
                    bannerSlot.innerHTML = '';
                    bannerSlot.appendChild(createBannerContent(banner));
                    
                    // Fade in do novo banner
                    bannerSlot.style.opacity = '1';
                }, 400);
            }

            function nextBanner() {
                currentIndex = (currentIndex + 1) % allBanners.length;
                updateBanner();
            }

            // Exibir o primeiro banner imediatamente
            updateBanner();
            
            // Iniciar rotação
            let intervalId = setInterval(nextBanner, rotationInterval);

            // Botões de navegação
            const navPrev = document.createElement('button');
            navPrev.innerHTML = '&#10094;';
            navPrev.style.position = 'absolute';
            navPrev.style.top = '50%';
            navPrev.style.left = '30px'; // Mais para dentro
            navPrev.style.transform = 'translateY(-50%)';
            navPrev.style.zIndex = '10';
            navPrev.style.backgroundColor = 'rgba(255,255,255,0.7)';
            navPrev.style.border = 'none';
            navPrev.style.borderRadius = '50%';
            navPrev.style.width = '30px';
            navPrev.style.height = '30px';
            navPrev.style.cursor = 'pointer';
            navPrev.style.fontSize = '14px';
            navPrev.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            navPrev.addEventListener('click', () => {
                clearInterval(intervalId);
                currentIndex = (currentIndex - 1 + allBanners.length) % allBanners.length;
                updateBanner();
                intervalId = setInterval(nextBanner, rotationInterval);
            });
            carouselContainer.appendChild(navPrev);

            const navNext = document.createElement('button');
            navNext.innerHTML = '&#10095;';
            navNext.style.position = 'absolute';
            navNext.style.top = '50%';
            navNext.style.right = '30px'; // Mais para dentro
            navNext.style.transform = 'translateY(-50%)';
            navNext.style.zIndex = '10';
            navNext.style.backgroundColor = 'rgba(255,255,255,0.7)';
            navNext.style.border = 'none';
            navNext.style.borderRadius = '50%';
            navNext.style.width = '30px';
            navNext.style.height = '30px';
            navNext.style.cursor = 'pointer';
            navNext.style.fontSize = '14px';
            navNext.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            navNext.addEventListener('click', () => {
                clearInterval(intervalId);
                nextBanner();
                intervalId = setInterval(nextBanner, rotationInterval);
            });
            carouselContainer.appendChild(navNext);
        })
        .catch(error => {
            console.error('Murall Banner Error:', error);
            bannerContainer.innerHTML = `
                <div style="text-align:center; padding:15px; color:#94a3b8; font-family:system-ui,-apple-system,sans-serif;">
                    <p>Não foi possível carregar os banners dos parceiros.</p>
                    <p style="margin-top:8px; font-size:0.8em;">
                        <a href="https://murall-xi.vercel.app" target="_blank" rel="noopener noreferrer" 
                           style="color:#2196F3; text-decoration:none;">Murall</a>
                    </p>
                </div>
            `;
        });
    }

    // Função para embaralhar array (algoritmo Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Executa assim que possível, mas também se inscreve no evento DOMContentLoaded
    // para garantir que funcione em qualquer cenário de carregamento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMurallBanners);
    } else {
        initMurallBanners();
    }
})();