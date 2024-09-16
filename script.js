function gerarPDF() {
    const nome = document.getElementById('nomeCompleto').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const dataConclusao = document.getElementById('dataConclusao').value;

    if (!nome || !curso || !dataConclusao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Adicionar header preto com logotipo
    doc.setFillColor(0, 0, 0); // Cor preta
    doc.rect(0, 0, 210, 20, 'F'); // Desenha um retângulo preto no topo
    doc.setTextColor(255, 255, 255); // Cor do texto branco
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("CERTIFICADO DE CONCLUSÃO", 105, 12, null, null, 'center');

    // Adicionar rodapé preto
    doc.setFillColor(0, 0, 0); // Cor preta
    doc.rect(0, 280, 210, 20, 'F'); // Desenha um retângulo preto no rodapé
    doc.setTextColor(255, 255, 255); // Texto branco
    doc.setFontSize(10);
    doc.text("Centro de Desenvolvimento e Cidadania", 105, 290, null, null, 'center');
    doc.text("www.cdc.org.br", 105, 295, null, null, 'center');

    // Resetar cor do texto para preto para o conteúdo principal
    doc.setTextColor(0, 0, 0); // Cor preta

    // Nome do participante
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text(nome.toUpperCase(), 105, 70, null, null, 'center'); // Nome em destaque

    // Detalhes do curso e data
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    const textoCurso = `concluiu o curso de ${curso} no dia ${new Date(dataConclusao).toLocaleDateString('pt-BR')}.`;
    doc.text(textoCurso, 105, 85, { maxWidth: 170, align: "center" });

    // Melhor espaçamento de elementos
    doc.setFontSize(12);
    doc.setFont("Helvetica", "italic");
    doc.text("Certificamos que", 105, 60, null, null, 'center');

    // Separador
    doc.setLineWidth(0.5);
    doc.line(30, 120, 180, 120);  // Linha divisória para assinaturas

    // Assinaturas
    doc.line(50, 130, 150, 130);  // Linha da assinatura 1
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("Ana Nery dos Santos Melo", 105, 135, null, null, 'center');
    doc.setFontSize(8);
    doc.setFont("Helvetica", "italic");
    doc.text("Presidente do Centro de Desenvolvimento e Cidadania", 105, 140, null, null, 'center');
    
    doc.line(50, 160, 150, 160);  // Linha da assinatura 2
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("Carlos Eduardo Braga Farias", 105, 165, null, null, 'center');
    doc.setFontSize(8);
    doc.setFont("Helvetica", "italic");
    doc.text("Secretário Executivo de Assistência Social", 105, 170, null, null, 'center');

    // Data de emissão com alinhamento ajustado
    doc.setFontSize(10);
    doc.text(`Recife, ${new Date().toLocaleDateString('pt-BR')}.`, 105, 100, null, null, 'center');

    // Salvar PDF
    doc.save('certificado_conclusao.pdf');
}
