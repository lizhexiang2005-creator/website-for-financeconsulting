export type Report = {
  ticker: string;
  company: string;
  sector: string;
  price: string;
  change: string;
  marketCap: string;
  pe: string;
  revenueGrowth: string;
  margin: string;
  generatedAt: string;
  summary: string;
  strengths: string[];
  risks: string[];
  actions: string[];
  chart: { month: string; value: number }[];
};

const sampleReports: Record<string, Omit<Report, "generatedAt">> = {
  "600519": {
    ticker: "600519",
    company: "贵州茅台",
    sector: "白酒",
    price: "¥1,678.00",
    change: "+0.86%",
    marketCap: "¥2.1万亿",
    pe: "24.8x",
    revenueGrowth: "15.9%",
    margin: "52.4%",
    summary:
      "贵州茅台仍然是 A 股里品牌壁垒最强、盈利质量最稳定的消费龙头之一。当前市场关注点主要在于批价稳定性、直营渠道节奏和高端白酒需求韧性。",
    strengths: ["品牌护城河深", "现金流质量高", "盈利能力长期稳定"],
    risks: ["高端消费波动", "批价波动影响预期", "估值对增长放缓较敏感"],
    actions: ["跟踪批价走势", "观察直营占比变化", "比较白酒龙头估值区间"],
    chart: [
      { month: "1月", value: 1712 },
      { month: "2月", value: 1688 },
      { month: "3月", value: 1665 },
      { month: "4月", value: 1698 },
      { month: "5月", value: 1706 },
      { month: "6月", value: 1678 },
    ],
  },
  "300750": {
    ticker: "300750",
    company: "宁德时代",
    sector: "动力电池",
    price: "¥202.35",
    change: "+1.93%",
    marketCap: "¥8,900亿",
    pe: "20.6x",
    revenueGrowth: "10.4%",
    margin: "14.1%",
    summary:
      "宁德时代是 A 股新能源链条里的核心资产，市场关注点集中在储能出货、海外扩张和单位盈利稳定性。板块情绪波动较大，但龙头地位仍然明确。",
    strengths: ["产业链话语权强", "客户结构广", "储能业务具备延展性"],
    risks: ["行业价格竞争", "海外政策变化", "新能源板块估值波动"],
    actions: ["跟踪储能业务增速", "观察单瓦时盈利", "比较龙头与二线厂商市占率"],
    chart: [
      { month: "1月", value: 176 },
      { month: "2月", value: 182 },
      { month: "3月", value: 191 },
      { month: "4月", value: 186 },
      { month: "5月", value: 198 },
      { month: "6月", value: 202 },
    ],
  },
  "002594": {
    ticker: "002594",
    company: "比亚迪",
    sector: "整车与电池",
    price: "¥248.60",
    change: "-0.37%",
    marketCap: "¥7,200亿",
    pe: "23.9x",
    revenueGrowth: "18.7%",
    margin: "6.5%",
    summary:
      "比亚迪兼具整车、三电和出海扩张逻辑，是 A 股汽车板块里最具综合竞争力的龙头之一。当前更需要关注单车利润、出口节奏和价格体系稳定性。",
    strengths: ["产业链一体化强", "车型矩阵完整", "出口增长空间大"],
    risks: ["价格战压力", "原材料成本波动", "海外扩张执行难度"],
    actions: ["跟踪月度销量", "观察出口占比变化", "比较单车盈利趋势"],
    chart: [
      { month: "1月", value: 219 },
      { month: "2月", value: 228 },
      { month: "3月", value: 241 },
      { month: "4月", value: 236 },
      { month: "5月", value: 252 },
      { month: "6月", value: 249 },
    ],
  },
};

const fallbackCompanies = ["华澄控股", "北辰资本", "明川科技", "远航实业"];

function createFallbackReport(ticker: string): Omit<Report, "generatedAt"> {
  const seed = ticker.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const company = fallbackCompanies[seed % fallbackCompanies.length];
  const base = 72 + (seed % 90);

  return {
    ticker,
    company,
    sector: "待接入实时数据",
    price: `¥${base.toFixed(2)}`,
    change: seed % 2 === 0 ? "+0.86%" : "-0.42%",
    marketCap: `¥${(180 + seed % 1100).toFixed(0)}亿`,
    pe: `${18 + (seed % 26)}.2x`,
    revenueGrowth: `${4 + (seed % 15)}.5%`,
    margin: `${8 + (seed % 20)}.1%`,
    summary:
      "这是基于股票代码生成的演示报告。当前版本先跑通产品体验，后续接入股票行情、财报与资讯数据接口后，这里会替换成真实数据驱动的分析。",
    strengths: ["报告结构已标准化", "可接入真实行情数据接口", "适合扩展为智能分析流程"],
    risks: ["尚未连接实时数据源", "财务指标为演示值", "不能作为投资依据"],
    actions: ["接入股票数据服务", "增加智能报告生成功能", "保存用户历史报告"],
    chart: Array.from({ length: 6 }, (_, index) => ({
      month: `${index + 1}月`,
      value: base + Math.round(Math.sin(index + seed) * 8) + index * 3,
    })),
  };
}

export function buildReport(ticker: string): Report {
  const normalizedTicker = ticker.trim().toUpperCase();
  const data = sampleReports[normalizedTicker] ?? createFallbackReport(normalizedTicker);

  return {
    ...data,
    generatedAt: new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date()),
  };
}
