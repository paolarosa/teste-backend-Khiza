# Seleção Khizer - Dev Backend

![logo khiza](img/capa_khiza.png)

Este é um projeto de teste para o processo seletivo de desenvolvedor backend da Khiza. Para saber mais sobre a empresa acesse <a href="https://khizadao.com">nosso site</a>.

## Descrição do teste

Utilize a API da Reservoir para consolidar dados sobre coleções de NFTs no seu banco de dados. O dado a ser consolidado é o `floorSale`, que representa o menor preço de venda de um NFT em um determinado período.

**Recursos:**
- Documentação da API: https://docs.reservoir.tools/reference/getcollectionsv6
- Como criar sua chave de API: https://docs.reservoir.tools/reference/dashboard-sign-up

## Requisitos obrigatórios

- Utilize um framework backend de sua escolha (sugestão: Laravel ou nest.js);
- Utilize um banco de dados de sua preferência (sugestão: MySQL ou PostgresSQL);
- Implemente um endpoint `POST /collection` que cadastra uma coleção a ser sincronizada posteriormente na rota `POST /sync`;
  - A coleção é identificada pelo seu `id` (consultar retorno da API);
- Implemente um endpoint `POST /sync` que dispara a atualização de dados de todas as coleções cadastradas;
- Implemente um endpoint `GET /collection/:id` que retorna os dados de uma coleção específica;
- Implemente um endpoint `GET /collection` que retorna os seguintes dados:
  - Média dos `floorSaleChange` de 30 dias das coleções que estão no seu banco;
  - Qual é o menor e o maior valor de `floorSaleChange` de 30 dias;
- Os dados devem ser gravados e consultados no seu banco de dados e não diretamente da API;
- Os valores de `floorSale` devem ser exibidos em porcentagem;

## Requisitos opcionais (bônus)

- Implemente um filtro por data de criação da coleção no endpoint `GET /collection`;
- Escreva um `docker-compose.yml` para subir a aplicação;
- Implemente um sistema de autenticação para garantir que apenas entidades autorizadas possam chamar os endpoints `POST /sync` e `POST /collection`;

## Observações

Os dados não precisam ser atualizados em tempo real, mas é importante que a aplicação seja capaz de atualizar os dados quando requisitado. Também não é necessária a implementação de autenticação, todas as rotas podem ser públicas a não ser que você queira fazer o requisito opcional.
Não é necessário guardar o histórico de atualizações, apenas o dado mais recente.

Em caso de dúvidas sobre a implementação entre em contato via e-mail com
<a href="mailto:yudi@khizadao.com">yudi@khizadao.com</a> ou entre em nosso servidor do Discord <a href="https://discord.gg/9VAqhxp6K6">clicando aqui</a>.
