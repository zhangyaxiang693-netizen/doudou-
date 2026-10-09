/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'
import image5 from './assets/image_5.svg'
import image6 from './assets/image_6.svg'
import image7 from './assets/image_7.svg'
import image8 from './assets/image_8.svg'
import image9 from './assets/image_9.svg'
import image10 from './assets/image_10.svg'
import image11 from './assets/image_11.svg'

export type IGeneratedComponent = {
  firstTitleText?: string
  firstBodyText?: string
  secondTitleText?: string
  secondBodyText?: string
  thirdTitleText?: string
  thirdBodyText?: string
  fourthTitleText?: string
  fourthBodyText?: string
  paragraphCount?: string | number
}

function parseParagraphCount(value: string | number | undefined) {
  const count = Number(value || 4)
  if (count <= 1) return 1
  if (count >= 4) return 4
  return Math.floor(count)
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const firstTitleText = props.firstTitleText || '投放什么目标？'
  const firstBodyText =
    props.firstBodyText ||
    '需要提升点赞/评论/转化量,\u00a0可以选择「点赞评论量」\n需要更多视频播放量,\u00a0可以选择「视频播放量」\n需要粉丝量快速提升,\u00a0达成千粉可以选择「粉丝量」'
  const secondTitleText = props.secondTitleText || '如何选择投放时长?'
  const secondBodyText =
    props.secondBodyText ||
    '优先建议24小时或者12小时投放,\u00a0可以匹配性价比最高流量,\u00a0建议预算不低于100元\n长期运营的账户,\u00a0可以拉长周期,\u00a0比如3天300元以上'
  const thirdTitleText = props.thirdTitleText || '什么作品适合投DOU+?'
  const thirdBodyText =
    props.thirdBodyText ||
    '优选系统推荐视频,\u00a0如果账号下出现「潜力视频」等系统标签,\u00a0建议优先投放\n建议多视频投放,\u00a0系统会自动选择多个视频中投放效果好的加大预算投入'
  const fourthTitleText = props.fourthTitleText || '投放影响自然流量么?'
  const fourthBodyText =
    props.fourthBodyText ||
    'DOU+付费流量与自然流量相互独立,\u00a0投放不会压制自然流量。优质数据反而可以协同带来更多自然流量。'
  const paragraphCount = parseParagraphCount(props.paragraphCount)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={image1}
              className={styles.image}
            />
            <img
              src={image2}
              className={styles.image1}
            />
          </div>
          <div className={styles.text}>{firstTitleText}</div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text1}>
            <ul className={styles.text1__listwrap}>
              {firstBodyText.split('\n').map((line, index, list) => (
                <li
                  className={index < list.length - 1 ? styles.text1__linebreak : undefined}
                  key={`first-${index}`}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {paragraphCount >= 2 ? (
        <>
          <img src={image3} className={styles.image2} />
          <div className={styles.wrap1}>
            <div className={styles.container2}>
              <div className={styles.content1}>
                <img
                  src={image4}
                  className={styles.image3}
                />
                <img
                  src={image5}
                  className={styles.image4}
                />
              </div>
              <div className={styles.text2}>{secondTitleText}</div>
            </div>
            <div className={styles.container3}>
              <div className={styles.text3}>
                <ul className={styles.text3__listwrap}>
                  {secondBodyText.split('\n').map((line, index, list) => (
                    <li
                      className={index < list.length - 1 ? styles.text3__linebreak : undefined}
                      key={`second-${index}`}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {paragraphCount >= 3 ? (
        <>
          <img src={image6} className={styles.image5} />
          <div className={styles.wrap2}>
            <div className={styles.container4}>
              <div className={styles.content2}>
                <img
                  src={image7}
                  className={styles.image6}
                />
                <img
                  src={image8}
                  className={styles.image7}
                />
              </div>
              <div className={styles.text4}>{thirdTitleText}</div>
            </div>
            <div className={styles.container5}>
              <div className={styles.text5}>
                <ul className={styles.text5__listwrap}>
                  {thirdBodyText.split('\n').map((line, index, list) => (
                    <li
                      className={index < list.length - 1 ? styles.text5__linebreak : undefined}
                      key={`third-${index}`}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {paragraphCount >= 4 ? (
        <>
          <img src={image9} className={styles.image8} />
          <div className={styles.wrap3}>
            <div className={styles.container6}>
              <div className={styles.content3}>
                <img
                  src={image10}
                  className={styles.image9}
                />
                <img
                  src={image11}
                  className={styles.image10}
                />
              </div>
              <div className={styles.text6}>{fourthTitleText}</div>
            </div>
            <div className={styles.container7}>
              <div className={styles.text7}>
                <ul className={styles.text7__listwrap}>
                  {fourthBodyText.split('\n').map((line, index, list) => (
                    <li
                      className={index < list.length - 1 ? styles.text7__linebreak : undefined}
                      key={`fourth-${index}`}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
