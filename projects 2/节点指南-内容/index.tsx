/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'
import image5 from './assets/image_5.svg'
import guideImage1 from './sucai/1.png'
import image7 from './assets/image_7.svg'
import image8 from './assets/image_8.svg'
import image9 from './assets/image_9.svg'
import image10 from './assets/image_10.svg'
import image11 from './assets/image_11.svg'
import guideImage2 from './sucai/2.png'
import image13 from './assets/image_13.svg'
import image14 from './assets/image_14.svg'
import image15 from './assets/image_15.svg'
import image16 from './assets/image_16.svg'
import image17 from './assets/image_17.svg'
import guideImage3 from './sucai/3.png'
import image19 from './assets/image_19.svg'
import image20 from './assets/image_20.svg'
import image21 from './assets/image_21.svg'
import image22 from './assets/image_22.svg'
import image23 from './assets/image_23.svg'
import guideImage4 from './sucai/4.png'

export type IGeneratedComponent = {
  card1IndustryTitle?: string
  card1TrendTitle?: string
  card1ContentTitle?: string
  card1Tag1?: string
  card1Tag2?: string
  card1Tag3?: string
  card1Tag4?: string
  card1ContentSummary?: string
  card1PlacementTitle?: string
  card1PlacementTextBefore1?: string
  card1PlacementHighlight1?: string
  card1PlacementTextBefore2?: string
  card1PlacementHighlight2?: string
  card1ActionTitle?: string
  card1ActionText?: string
  card2IndustryTitle?: string
  card2TrendTitle?: string
  card2ContentTitle?: string
  card2Tag1?: string
  card2Tag2?: string
  card2Tag3?: string
  card2ContentSummary?: string
  card2PlacementTitle?: string
  card2PlacementTextBefore?: string
  card2PlacementHighlight?: string
  card2ActionTitle?: string
  card2ActionText?: string
  card3IndustryTitle?: string
  card3TrendTitle?: string
  card3ContentTitle?: string
  card3Tag1?: string
  card3Tag2?: string
  card3Tag3?: string
  card3ContentSummary?: string
  card3PlacementTitle?: string
  card3PlacementTextBefore?: string
  card3PlacementHighlight?: string
  card3ActionTitle?: string
  card3ActionText?: string
  card4IndustryTitle?: string
  card4TrendTitle?: string
  card4ContentTitle?: string
  card4Tag1?: string
  card4Tag2?: string
  card4Tag3?: string
  card4ContentSummary?: string
  card4PlacementTitle?: string
  card4PlacementTextBefore?: string
  card4PlacementHighlight?: string
  card4ActionTitle?: string
  card4ActionText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const p = {
    card1IndustryTitle: props.card1IndustryTitle || '「服装配饰行业」',
    card1TrendTitle: props.card1TrendTitle || '#\u00a0七夕驱动穿搭需求集中爆发',
    card1ContentTitle: props.card1ContentTitle || '视频内容建议做：',
    card1Tag1: props.card1Tag1 || '场景型',
    card1Tag2: props.card1Tag2 || '对比型',
    card1Tag3: props.card1Tag3 || '清单型',
    card1Tag4: props.card1Tag4 || '上身效果型',
    card1ContentSummary: props.card1ContentSummary || '镜头须一眼看懂版型搭配，8/12起日更2-3条',
    card1PlacementTitle: props.card1PlacementTitle || '投放建议：',
    card1PlacementTextBefore1: props.card1PlacementTextBefore1 || '投放「视频播放」，8/19晚18-22点保留',
    card1PlacementHighlight1: props.card1PlacementHighlight1 || '60%预算',
    card1PlacementTextBefore2: props.card1PlacementTextBefore2 || '追投，剩余预算考虑前置推广，建议每单',
    card1PlacementHighlight2: props.card1PlacementHighlight2 || '100~300元',
    card1ActionTitle: props.card1ActionTitle || '执行要点：',
    card1ActionText: props.card1ActionText || '8.17\u00a0起前置直播预热，评论区承接尺码穿搭咨询',
    card2IndustryTitle: props.card2IndustryTitle || '「文体娱乐行业」',
    card2TrendTitle: props.card2TrendTitle || '#\u00a0七夕约会需求集中爆发',
    card2ContentTitle: props.card2ContentTitle || '视频内容建议做：',
    card2Tag1: props.card2Tag1 || '氛围切片型',
    card2Tag2: props.card2Tag2 || '路线推荐型',
    card2Tag3: props.card2Tag3 || '预告倒计时型',
    card2ContentSummary: props.card2ContentSummary || '8/16-8/19密集发布（每天2-4条）保持持续曝光',
    card2PlacementTitle: props.card2PlacementTitle || '投放建议：',
    card2PlacementTextBefore: props.card2PlacementTextBefore || '投放视频播放，8/19采用3-6小时短时快速放量，同城活动先锁城市或商圈定向，每条视频',
    card2PlacementHighlight: props.card2PlacementHighlight || '200-300元',
    card2ActionTitle: props.card2ActionTitle || '执行要点：',
    card2ActionText: props.card2ActionText || '优先突出情绪氛围，前置主页/预约/私信入口',
    card3IndustryTitle: props.card3IndustryTitle || '「餐饮服务行业」',
    card3TrendTitle: props.card3TrendTitle || '#\u00a0七夕餐饮到店为主\u00a0聚焦去哪吃',
    card3ContentTitle: props.card3ContentTitle || '视频内容建议做：',
    card3Tag1: props.card3Tag1 || '氛围呈现型',
    card3Tag2: props.card3Tag2 || '套餐展示型',
    card3Tag3: props.card3Tag3 || '探店种草型',
    card3ContentSummary: props.card3ContentSummary || '发布需前置到16点开始，提前抢占流量',
    card3PlacementTitle: props.card3PlacementTitle || '投放建议：',
    card3PlacementTextBefore: props.card3PlacementTextBefore || '关键时段10、16点提前投，8/19晚18-22点重点投；定向优先门店周边及办公区，每条',
    card3PlacementHighlight: props.card3PlacementHighlight || '100-200元',
    card3ActionTitle: props.card3ActionTitle || '执行要点：',
    card3ActionText: props.card3ActionText || '转化需预设主页、私信、电话入口',
    card4IndustryTitle: props.card4IndustryTitle || '「传媒资讯行业」',
    card4TrendTitle: props.card4TrendTitle || '#\u00a0七夕传媒聚焦热点与互动',
    card4ContentTitle: props.card4ContentTitle || '视频内容建议做：',
    card4Tag1: props.card4Tag1 || '热点解读型',
    card4Tag2: props.card4Tag2 || '内容剪辑型',
    card4Tag3: props.card4Tag3 || '榜单盘点型',
    card4ContentSummary: props.card4ContentSummary || '节中可高频连续更新追热点',
    card4PlacementTitle: props.card4PlacementTitle || '投放建议：',
    card4PlacementTextBefore: props.card4PlacementTextBefore || '主要聚焦节前和节中投放，投视频播放，多视频同推测爆款，节中结合热点快速投放，每条',
    card4PlacementHighlight: props.card4PlacementHighlight || '200-300元',
    card4ActionTitle: props.card4ActionTitle || '执行要点：',
    card4ActionText: props.card4ActionText || '预留热点空间，强化互动，避免单一节日祝福',
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content1}>
            <div className={styles.main1}>
              <div className={styles.text11}>
                <div className={styles.text11__listwrap}>{p.card1IndustryTitle}</div>
              </div>
              <div className={styles.section2}>
                <div className={styles.text12}>{p.card1TrendTitle}</div>
              </div>
            </div>
            <div className={styles.section3}>
              <div className={styles.subSection4}>
                <div className={styles.block5}>
                  <img src={image1} className={styles.image6} />
                  <div className={styles.subBlock4}>
                    <div className={styles.div9}></div>
                    <img src={image2} className={styles.image7} />
                  </div>
                </div>
                <div className={styles.text13}>{p.card1ContentTitle}</div>
              </div>
              <div className={styles.subSection5}>
                <div className={styles.block6}>
                  <div className={styles.subBlock5}><div className={styles.div10}><div className={styles.text14}>{p.card1Tag1}</div></div></div>
                  <div className={styles.subBlock6}><div className={styles.div11}><div className={styles.text15}>{p.card1Tag2}</div></div></div>
                  <div className={styles.subBlock7}><div className={styles.div12}><div className={styles.text16}>{p.card1Tag3}</div></div></div>
                  <div className={styles.subBlock8}><div className={styles.div13}><div className={styles.text17}>{p.card1Tag4}</div></div></div>
                </div>
              </div>
              <div className={styles.text18}><div className={styles.text18__listwrap}>{p.card1ContentSummary}</div></div>
            </div>
            <div className={styles.section4}>
              <div className={styles.subSection6}>
                <div className={styles.block7}>
                  <img src={image3} className={styles.image8} />
                  <div className={styles.subBlock9}><img src={image4} className={styles.image9} /></div>
                </div>
                <div className={styles.text19}>{p.card1PlacementTitle}</div>
              </div>
              <div className={styles.text20}>
                {p.card1PlacementTextBefore1}
                <span className={styles.text20__seg1}>{p.card1PlacementHighlight1}</span>
                {p.card1PlacementTextBefore2}
                <span className={styles.text20__seg3}>{p.card1PlacementHighlight2}</span>
              </div>
            </div>
            <div className={styles.section5}>
              <div className={styles.subSection7}><div className={styles.block8}></div></div>
              <div className={styles.subSection8}>
                <div className={styles.text21}>{p.card1ActionTitle}</div>
                <img src={image5} className={styles.image10} />
                <div className={styles.text22}>{p.card1ActionText}</div>
              </div>
            </div>
          </div>
        </div>
        <img src={guideImage1} className={styles.image11} />
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.content2}>
            <div className={styles.main3}>
              <div className={styles.section6}>
                <div className={styles.text23}><div className={styles.text23__listwrap}>{p.card2IndustryTitle}</div></div>
                <div className={styles.subSection9}><div className={styles.text24}>{p.card2TrendTitle}</div></div>
              </div>
              <div className={styles.subSection10}>
                <div className={styles.block9}>
                  <div className={styles.subBlock10}>
                    <img src={image7} className={styles.image12} />
                    <div className={styles.div14}><div className={styles.div15}></div><img src={image8} className={styles.image13} /></div>
                  </div>
                  <div className={styles.text25}>{p.card2ContentTitle}</div>
                </div>
                <div className={styles.block10}>
                  <div className={styles.subBlock11}>
                    <div className={styles.div16}><div className={styles.div17}><div className={styles.text26}>{p.card2Tag1}</div></div></div>
                    <div className={styles.div18}><div className={styles.div19}><div className={styles.text27}>{p.card2Tag2}</div></div></div>
                    <div className={styles.div20}><div className={styles.div21}><div className={styles.text28}>{p.card2Tag3}</div></div></div>
                  </div>
                </div>
                <div className={styles.text29}><div className={styles.text29__listwrap}>{p.card2ContentSummary}</div></div>
              </div>
              <div className={styles.subSection11}>
                <div className={styles.block11}>
                  <div className={styles.subBlock12}>
                    <img src={image9} className={styles.image14} />
                    <div className={styles.div22}><img src={image10} className={styles.image15} /></div>
                  </div>
                  <div className={styles.text30}>{p.card2PlacementTitle}</div>
                </div>
                <div className={styles.text31}>
                  {p.card2PlacementTextBefore}
                  <span className={styles.text31__seg1}>{p.card2PlacementHighlight}</span>
                </div>
              </div>
              <div className={styles.subSection12}>
                <div className={styles.block12}><div className={styles.subBlock13}></div></div>
                <div className={styles.block13}>
                  <div className={styles.text32}>{p.card2ActionTitle}</div>
                  <img src={image11} className={styles.image16} />
                  <div className={styles.text33}>{p.card2ActionText}</div>
                </div>
              </div>
            </div>
          </div>
            <img src={guideImage2} className={styles.image17} />
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section}>
                <div className={styles.text}><div className={styles.text__listwrap}>{p.card3IndustryTitle}</div></div>
                <div className={styles.subSection}><div className={styles.text1}>{p.card3TrendTitle}</div></div>
              </div>
              <div className={styles.subSection1}>
                <div className={styles.block}>
                  <div className={styles.subBlock}>
                    <img src={image13} className={styles.image} />
                    <div className={styles.div}><div className={styles.div1}></div><img src={image14} className={styles.image1} /></div>
                  </div>
                  <div className={styles.text2}>{p.card3ContentTitle}</div>
                </div>
                <div className={styles.block1}>
                  <div className={styles.subBlock1}>
                    <div className={styles.div2}><div className={styles.div3}><div className={styles.text3}>{p.card3Tag1}</div></div></div>
                    <div className={styles.div4}><div className={styles.div5}><div className={styles.text4}>{p.card3Tag2}</div></div></div>
                    <div className={styles.div6}><div className={styles.div7}><div className={styles.text5}>{p.card3Tag3}</div></div></div>
                  </div>
                </div>
                <div className={styles.text6}><div className={styles.text6__listwrap}>{p.card3ContentSummary}</div></div>
              </div>
              <div className={styles.subSection2}>
                <div className={styles.block2}>
                  <div className={styles.subBlock2}>
                    <img src={image15} className={styles.image2} />
                    <div className={styles.div8}><img src={image16} className={styles.image3} /></div>
                  </div>
                  <div className={styles.text7}>{p.card3PlacementTitle}</div>
                </div>
                <div className={styles.text8}>
                  {p.card3PlacementTextBefore}
                  <span className={styles.text8__seg1}>{p.card3PlacementHighlight}</span>
                </div>
              </div>
              <div className={styles.subSection3}>
                <div className={styles.block3}><div className={styles.subBlock3}></div></div>
                <div className={styles.block4}>
                  <div className={styles.text9}>{p.card3ActionTitle}</div>
                  <img src={image17} className={styles.image4} />
                  <div className={styles.text10}>{p.card3ActionText}</div>
                </div>
              </div>
            </div>
          </div>
            <img src={guideImage3} className={styles.image5} />
        </div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.container3}>
          <div className={styles.content3}>
            <div className={styles.main4}>
              <div className={styles.section8}>
                <div className={styles.text34}><div className={styles.text34__listwrap}>{p.card4IndustryTitle}</div></div>
                <div className={styles.subSection13}><div className={styles.text35}>{p.card4TrendTitle}</div></div>
              </div>
              <div className={styles.subSection14}>
                <div className={styles.block14}>
                  <div className={styles.subBlock14}>
                    <img src={image19} className={styles.image18} />
                    <div className={styles.div23}><div className={styles.div24}></div><img src={image20} className={styles.image19} /></div>
                  </div>
                  <div className={styles.text36}>{p.card4ContentTitle}</div>
                </div>
                <div className={styles.block15}>
                  <div className={styles.subBlock15}>
                    <div className={styles.div25}><div className={styles.div26}><div className={styles.text37}>{p.card4Tag1}</div></div></div>
                    <div className={styles.div27}><div className={styles.div28}><div className={styles.text38}>{p.card4Tag2}</div></div></div>
                    <div className={styles.div29}><div className={styles.div30}><div className={styles.text39}>{p.card4Tag3}</div></div></div>
                  </div>
                </div>
                <div className={styles.text40}><div className={styles.text40__listwrap}>{p.card4ContentSummary}</div></div>
              </div>
              <div className={styles.subSection15}>
                <div className={styles.block16}>
                  <div className={styles.subBlock16}>
                    <img src={image21} className={styles.image20} />
                    <div className={styles.div31}><img src={image22} className={styles.image21} /></div>
                  </div>
                  <div className={styles.text41}>{p.card4PlacementTitle}</div>
                </div>
                <div className={styles.text42}>
                  {p.card4PlacementTextBefore}
                  <span className={styles.text42__seg1}>{p.card4PlacementHighlight}</span>
                </div>
              </div>
              <div className={styles.subSection16}>
                <div className={styles.block17}><div className={styles.subBlock17}></div></div>
                <div className={styles.block18}>
                  <div className={styles.text43}>{p.card4ActionTitle}</div>
                  <img src={image23} className={styles.image22} />
                  <div className={styles.text44}>{p.card4ActionText}</div>
                </div>
              </div>
            </div>
          </div>
            <img src={guideImage4} className={styles.image23} />
        </div>
      </div>
    </div>
  )
}
