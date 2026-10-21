'use strict';

// The English content lives in index.html; edit Chinese translations here.
const chinese = {
  skip:'跳转至正文',navAbout:'关于我',navResearch:'科研经历',navBackground:'教育与荣誉',navContact:'联系',
  affiliation:'北京大学 · 计算机科学与技术',statement:'探索感知、推理<br>与行动之间的联系。',
  bio1:'我是<a href="https://www.pku.edu.cn/" target="_blank" rel="noopener noreferrer">北京大学</a>信息科学技术学院计算机科学与技术专业本科生，预计于 2027 年 7 月毕业，计划 2027 年在北大继续读硕士。',
  bio2:'我的研究兴趣是<strong>具身智能与多模态表征学习</strong>。我关注导航模型如何按任务需求构建视觉表征，并在行动前预测未来；也在探索视频理解与可靠的大语言模型智能体。',
  emailMe:'邮件联系',viewResearch:'了解我的研究',portraitCaption:'本科生研究者 · 北京大学',
  interestsLabel:'研究兴趣',interest1:'具身智能',interest2:'多模态学习',interest3:'可靠智能体',
  researchKicker:'正在探索的问题',researchTitle:'精选科研经历',researchIntro:'从视觉表征学习出发，探索智能系统如何在真实世界中做出可靠决策。',
  cofirst:'共同第一作者',navStatus:'研究稿件',
  navSummary:'RepresentNav 从互补的视觉编码器中学习面向任务的表征空间，并在行动前预测未来表征，将视觉感知与潜在世界建模相结合。',
  secondAuthor:'第二作者',
  formalSummary:'将智能体流程转化为带有结构化动作、生命周期钩子和显式状态的可执行技能，让长程任务的流程约束更可靠，并减少 token 消耗。',
  copyCitation:'复制引用',videoTag:'视频理解',videoStatus:'科研项目',
  videoSummary:'以“一段视频对应一组摘要”刻画摘要的主观性，将基于扩散重建的重要性估计与贝叶斯式片段顺序选择相结合，生成多样化的视频摘要。',
  backgroundKicker:'学业与实践',backgroundTitle:'教育背景与荣誉',education:'教育背景',pku:'北京大学',degree:'计算机科学与技术 · 本科',school:'信息科学技术学院',graduation:'预计毕业 · 2027 年 7 月',admission:'计划2027年在北大继续读硕士',awards:'部分荣誉',xiaomi:'小米一等奖学金',haiwen:'北京大学海闻奖学金',
  contactKicker:'交流与联系',contactTitle:'保持好奇，<br>也期待与你交流。',contactText:'欢迎就具身智能、多模态学习与可靠智能体等研究方向联系我，交流想法与经验。',footer:'在北京大学，带着好奇心继续探索。',backTop:'回到顶部 ↑'
};
const translatedNodes = [...document.querySelectorAll('[data-i18n]')];
const english = Object.fromEntries(translatedNodes.map(node => [node.dataset.i18n,node.innerHTML]));
const languageButton = document.querySelector('.language-toggle');
let currentLanguage = 'en';

function setLanguage(language) {
  currentLanguage = language === 'zh' ? 'zh' : 'en';
  const dictionary = currentLanguage === 'zh' ? chinese : english;
  for (const node of translatedNodes) {
    const value = dictionary[node.dataset.i18n];
    if (value !== undefined) node.innerHTML = value;
  }
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
  document.querySelector('#language-label').textContent = currentLanguage === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label',currentLanguage === 'zh' ? 'Switch to English' : 'Switch to Chinese');
  document.querySelector('.portrait').alt = currentLanguage === 'zh' ? '高美珺在户外石墙前的个人照片' : 'Meijun Gao smiling outdoors in front of a stone wall';
  document.querySelector('nav').setAttribute('aria-label',currentLanguage === 'zh' ? '主导航' : 'Main navigation');
  try { localStorage.setItem('meijun-language',currentLanguage); } catch (_) { /* Works when storage is disabled. */ }
}
languageButton.addEventListener('click',() => setLanguage(currentLanguage === 'en' ? 'zh' : 'en'));
try { if (localStorage.getItem('meijun-language') === 'zh') setLanguage('zh'); } catch (_) {}

const citationToggle = document.querySelector('.bibtex-toggle');
citationToggle.addEventListener('click',() => {
  const citation = document.getElementById(citationToggle.getAttribute('aria-controls'));
  const expanded = citationToggle.getAttribute('aria-expanded') !== 'true';
  citationToggle.setAttribute('aria-expanded',String(expanded));
  citation.hidden = !expanded;
  citationToggle.querySelector('span').textContent = expanded ? '−' : '+';
});
document.querySelector('.copy-citation').addEventListener('click',async () => {
  const code = document.querySelector('.citation-box code');
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = currentLanguage === 'zh' ? '已复制' : 'Copied';
  } catch (_) {
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = currentLanguage === 'zh' ? '已选中，请按 Ctrl/Cmd+C 复制' : 'Selected — press Ctrl/Cmd+C to copy';
  }
});

const navigationLinks = [...document.querySelectorAll('nav a')];
const sections = navigationLinks.map(link => document.querySelector(link.getAttribute('href')));
let ticking = false;
function updateNavigation() {
  let active = sections[0].id;
  const boundary = Math.min(220,window.innerHeight * .3);
  for (const section of sections) if (section.getBoundingClientRect().top <= boundary) active = section.id;
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) active = 'contact';
  navigationLinks.forEach(link => {
    const selected = link.getAttribute('href') === '#' + active;
    link.classList.toggle('active',selected);
    if (selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
  ticking = false;
}
window.addEventListener('scroll',() => { if (!ticking) {requestAnimationFrame(updateNavigation); ticking = true;} },{passive:true});
window.addEventListener('resize',updateNavigation);
updateNavigation();
