// Base de conocimiento simulada para la demo de RAG de Agencia ICU.
// Representa documentos privados de la empresa que el sistema "recupera"
// antes de generar una respuesta con el LLM.

export type KbDoc = {
  id: number;
  title: string;
  source: string;
  content: string;
};

export const KNOWLEDGE_BASE: KbDoc[] = [
  {
    id: 1,
    title: "Servicio de RAG Empresarial",
    source: "Ficha de servicio · ICU-DOC-001",
    content:
      "El servicio de RAG Empresarial conecta los documentos privados del cliente (PDFs, Notion, Google Drive, wikis internas) a un modelo de lenguaje. El pipeline incluye: ingesta y limpieza de documentos, vectorización con embeddings, almacenamiento en una base vectorial, recuperación semántica top-k en el momento de la consulta y generación con citaciones trazables. Las respuestas incluyen referencias [n] al documento fuente original. El despliegue puede ser en nube privada del cliente o on-premise.",
  },
  {
    id: 2,
    title: "Modelo de pricing y planes",
    source: "Política comercial · ICU-DOC-002",
    content:
      "Agencia ICU ofrece tres modalidades de contratación. Proyecto llave en mano: cotización única según alcance, complejidad e infraestructura, ideal para implementaciones de RAG o agentes autónomos. Retainer mensual: tarifa fija mensual para operación continua, monitoreo y optimización, recomendado para sistemas en producción. Híbrido: proyecto inicial + retener de operación. La auditoría inicial de 30 minutos es gratuita y entrega un estimado de ROI. El 94% de quienes hacen la auditoría avanzan a implementación.",
  },
  {
    id: 3,
    title: "SLA y disponibilidad",
    source: "Contrato de servicio v3 · ICU-DOC-003",
    content:
      "El SLA garantizado para sistemas en producción es del 99.9% de disponibilidad mensual. El monitoreo es 24/7 con alertas en tiempo real. Tiempo de respuesta a incidentes críticos: menos de 30 minutos en horario hábil y menos de 2 horas fuera de horario. Se entregan reportes mensuales de desempeño, latencia y uso. Si el SLA no se cumple, se aplica un crédito de servicio proporcional según lo definido en la cláusula 7 del contrato.",
  },
  {
    id: 4,
    title: "Política de seguridad y privacidad",
    source: "Política de seguridad · ICU-DOC-004",
    content:
      "Todos los proyectos operan bajo NDA. Los datos se cifran en tránsito (TLS 1.3) y en reposo (AES-256). Se ofrece despliegue on-premise o en nube privada (AWS, GCP, Azure). Para sectores regulados se implementan controles de acceso por rol (RBAC), auditoría completa de accesos y logs inmutables. Los datos del cliente NUNCA se usan para entrenar modelos de terceros. Para modelos a medida, el fine-tuning se ejecuta dentro del perímetro del cliente. Cumplimiento con GDPR y ley chilena 19.628 de protección de datos.",
  },
  {
    id: 5,
    title: "Proceso de implementación",
    source: "Metodología ICU · ICU-DOC-005",
    content:
      "El proceso tiene 4 etapas. Diagnóstico (1 semana): auditoría de procesos, mapa de oportunidades y ROI estimado. Diseño y Build (2-4 semanas): prototipado del agente o flujo, integración con herramientas del cliente y validación con datos reales. Despliegue (1 semana): lanzamiento a producción con monitoreo, observabilidad y guardrails, más capacitación del equipo. Optimización continua (ongoing): medición de resultados, reentrenamiento y escalado a nuevas áreas. Una prueba piloto toma entre 2 y 4 semanas; un sistema RAG completo de 4 a 8 semanas.",
  },
  {
    id: 6,
    title: "Integraciones soportadas",
    source: "Catálogo técnico · ICU-DOC-006",
    content:
      "Agencia ICU integra con: CRM (HubSpot, Salesforce, Pipedrive), ERPs, Notion, Google Workspace, Microsoft 365, WhatsApp Business, Slack, Microsoft Teams, correo electrónico, y cualquier sistema con API REST o webhooks. Para herramientas sin API se evalúan alternativas como RPA o exportaciones programadas. Las integraciones se construyen sobre n8n, Make o conectores custom en TypeScript. Todas las integraciones incluyen reintentos, circuit breakers y monitoreo de fallos.",
  },
  {
    id: 7,
    title: "Agentes autónomos — capacidades",
    source: "Ficha técnica · ICU-DOC-007",
    content:
      "Los agentes autónomos de Agencia ICU pueden tomar decisiones, ejecutar tareas y comunicarse con herramientas externas sin supervisión humana. Capacidades: uso de herramientas (tool use), recuperación con RAG, memoria de conversación, multi-agente con delegación de tareas, y guardrails de seguridad. Casos típicos: soporte al cliente, calificación de leads, onboarding, procesamiento de documentos y reportes automáticos. Operan 24/7 y escalan horizontalmente. Cada acción se registra para auditoría.",
  },
  {
    id: 8,
    title: "Soporte y mantenimiento",
    source: "Política de soporte · ICU-DOC-008",
    content:
      "El soporte se entrega por canales de Slack/Teams dedicados y email. Niveles: Soporte Estándar (incluido en retainer, horario hábil), Soporte Premium (24/7, respuesta prioritaria). Incluye monitoreo proactivo, actualizaciones de modelos, parches de seguridad y optimización continua de prompts. La documentación técnica y manuales de operación se entregan al cliente. Se ofrece capacitación inicial y sesiones de transferencia de conocimiento para que el equipo del cliente pueda operar el sistema de forma autónoma.",
  },
];

// Stopwords básicas en español para mejorar el retrieval.
const STOPWORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "al", "y",
  "o", "que", "en", "es", "se", "su", "para", "con", "por", "como", "mas", "más",
  "lo", "le", "les", "a", "ante", "bajo", "cabe", "contra", "desde", "durante",
  "entre", "hacia", "hasta", "mediante", "para", "según", "sin", "so", "sobre",
  "tras", "versus", "via", "no", "si", "sí", "ni", "pero", "porque", "cuando",
  "donde", "cual", "cuales", "quien", "quienes", "cuyo", "cuya", "esto", "eso",
  "esta", "ese", "estos", "esos", "estas", "esas", "mi", "tu", "su", "nuestro",
  "vuestro", "yo", "tú", "él", "ella", "nosotros", "vosotros", "ellos", "ellas",
  "me", "te", "se", "nos", "os", "les", "le", "han", "ha", "he", "has", "hay",
  "fue", "ser", "son", "está", "están", "estaba", "puede", "pueden", "tener",
  "tiene", "tienen", "hacer", "hace", "van", "va", "f", "q", "k", "x",
]);

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function termFreq(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return tf;
}

export type RetrievedDoc = KbDoc & { score: number };

/**
 * Recupera los `topK` documentos más relevantes para la consulta,
 * usando un scoring simple basado en solapamiento de términos (TF)
 * con bonus por coincidencia en el título.
 */
export function retrieve(query: string, topK = 3): RetrievedDoc[] {
  const queryTokens = normalize(query);
  if (queryTokens.length === 0) return [];

  const scored = KNOWLEDGE_BASE.map((doc) => {
    const titleTokens = normalize(doc.title);
    const bodyTokens = normalize(doc.content);
    const titleTf = termFreq(titleTokens);
    const bodyTf = termFreq(bodyTokens);

    let score = 0;
    for (const qt of queryTokens) {
      // bonus por título (más peso)
      score += (titleTf.get(qt) ?? 0) * 3;
      score += (bodyTf.get(qt) ?? 0) * 1;
    }
    // normalización ligera por longitud del documento
    score = score / (1 + Math.sqrt(bodyTokens.length) / 50);
    return { ...doc, score };
  });

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Construye el contexto numerado para el LLM a partir de los docs recuperados.
 */
export function buildContext(docs: RetrievedDoc[]): string {
  return docs
    .map(
      (d, i) =>
        `[${i + 1}] ${d.title} (${d.source})\n${d.content}`
    )
    .join("\n\n");
}
