import React, { useEffect, useState, useRef } from 'react'
import {
  Title,
  Button,
  useOverlay,
  useTooltip,
  useModal,
  ContextualMenuItem,
  Text,
  useMenu,
  notify,
  useContextualMenu,
  useDropdown,
  Input,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomLongText, randomTitle } from './util'

const ModalChildren = ({ children }) => {
  return (
    <div>
      <Title>Hello this is a child</Title>
      <Text>{randomLongText()}</Text>
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Button
          {...useContextualMenu(() => {
            return 'yes!'
          })}
        >
          Snurky pants
        </Button>
      </div>
      {children}
    </div>
  )
}

export default {
  name: 'overlay',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'notify',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              onClick={() => {
                notify({
                  type: Math.random() > 0.5 ? 'error' : 'info',
                  title: randomLongText(),
                })
              }}
            >
              notify!
            </Button>
          )
        },
      ],
    },

    {
      name: 'basic overlay',
      category: 'overlay',
      props: [
        () => {
          const [text, setText] = useState('useOverlay')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useOverlay ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])

          return (
            <Button
              color={{ color: 'secondary' }}
              onClick={useOverlay(Title, {
                style: {
                  marginLeft: 10,
                  marginRight: 10,
                },
                width: 'auto',
                singleLine: true,
                children: text,
              })}
            >
              useOverlay
            </Button>
          )
        },
      ],
    },
    {
      name: 'tooltip',
      category: 'overlay',
      props: [
        () => {
          const [text, setText] = useState('useTooltip')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useTooltip ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])

          return (
            <Button color={{ color: 'foreground' }} {...useTooltip(text)}>
              tooltip
            </Button>
          )
        },
      ],
    },
    {
      name: 'modal',
      category: 'overlay',
      props: [
        () => {
          const d = useRef({ flap: 0 })
          const [data, setData] = useState({ flap: 0 })

          return (
            <Button
              onClick={useModal(
                (props) => {
                  console.info('props', props)

                  return (
                    <div>
                      <p>{randomLongText()}</p>
                      <Button
                        onClick={useModal(
                          () => {
                            return <div>{randomLongText()}</div>
                          },
                          {
                            header: { title: 'Another modal' },
                          }
                        )}
                      >
                        open another modal
                      </Button>
                    </div>
                  )
                },
                {
                  data: d.current,
                  header: ({ data }) => {
                    // flurpy
                    return {
                      icon: 'time',
                      framed: true,
                      title: data.flap,
                      closeButton: true,
                      children: <div>snurpy</div>,
                    }
                  },
                }
              )}
            >
              useModal from modal
            </Button>
          )
        },

        () => {
          return (
            <Button
              onClick={useModal(
                (props) => {
                  console.info('props', props)

                  return <div>THIS IS SOMETHING</div>
                },
                {
                  header: {
                    icon: 'time',
                    framed: true,
                    title: randomTitle(),
                    closeButton: true,
                    children: (
                      <div>
                        <Button color={{ color: 'background' }}>Snurp</Button>
                      </div>
                    ),
                  },
                  confirmButton: {
                    icon: 'time',
                    label: 'No way josé',
                    onConfirm: () => console.log('confirmed!'),
                  },
                }
              )}
            >
              useModal + component
            </Button>
          )
        },
        () => {
          const [editableTitle, setEditableTitle] = useState(randomTitle())
          return (
            <Button
              onClick={useModal(
                (props) => {
                  return <div>Try to edit the title...</div>
                },
                {
                  header: {
                    icon: 'time',
                    framed: true,
                    title: editableTitle,
                    onEditableTitleChange: (_: any, value: string) => {
                      console.log('Title changed:', value)
                      setEditableTitle(value)
                    },
                    closeButton: true,
                    children: (
                      <div>
                        <Button color={{ color: 'background' }}>Snurp</Button>
                      </div>
                    ),
                  },
                }
              )}
            >
              useModal + Editable title
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal + input')

          return (
            <Button
              onClick={useModal(
                (props) => {
                  return (
                    <div>
                      {/* @ts-ignore */}
                      <Input border value={props.text} onChange={setText} />
                    </div>
                  )
                },
                {
                  text,
                  header: {
                    icon: 'time',
                    framed: true,
                    // title: randomTitle(),
                    closeButton: true,
                    children: (
                      <div>
                        <Button color={{ color: 'background' }}>Snurp</Button>
                      </div>
                    ),
                  },
                  confirmButton: {
                    icon: 'time',
                    label: 'No way josé',
                    onConfirm: () => console.log('confirmed!'),
                  },
                }
              )}
            >
              useModal with input and updates
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  framed: true,
                  title: randomTitle(),
                  closeButton: true,
                  children: (
                    <div>
                      <Button color={{ color: 'background' }}>Snurp</Button>
                    </div>
                  ),
                },
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              useModal
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant A')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant A ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  title: randomTitle(),
                  closeButton: true,
                  children: (
                    <div>
                      <Button color={{ color: 'background' }}>Snurp</Button>
                    </div>
                  ),
                },
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              useModal Variant A
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant B')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant B ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              useModal Variant B
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant C')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant C ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button onClick={useModal(<ModalChildren>{text}</ModalChildren>)}>
              useModal Variant C
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant D')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant D ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  framed: true,
                  title: randomTitle(),
                  closeButton: true,
                },
              })}
            >
              useModal Variant D
            </Button>
          )
        },

        () => {
          const d = useRef({ flap: 0 })
          const [data, setData] = useState({ flap: 0 })

          return (
            <Button
              onClick={useModal(
                (props) => {
                  console.info('props', props)

                  return (
                    <div>
                      <Button
                        onClick={() => {
                          d.current.flap = Math.random()
                          setData({
                            flap: Math.random(),
                          })
                        }}
                      >
                        put update
                      </Button>
                    </div>
                  )
                },
                {
                  data: d.current,
                  header: ({ data }) => {
                    // flurpy
                    return {
                      icon: 'time',
                      framed: true,
                      title: data.flap,
                      closeButton: true,
                      children: <div>snurpy</div>,
                    }
                  },
                }
              )}
            >
              useModal + fn and update
            </Button>
          )
        },
      ],
    },

    {
      name: 'dropdown',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                [
                  { value: 'hello', icon: 'skip' },
                  { value: 'bye', icon: 'smartCopy' },
                ],
                (value, index) => {
                  console.log('-->', value, index)
                },
                undefined,
                { multi: true }
              )}
            >
              Multi icon dropdown
            </Button>
          )
        },
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                [{ value: { en: 'hello', de: 'x' } }, { value: 'bye' }],
                (value, index) => {
                  console.log('-->', value, index)
                }
              )}
            >
              Single dropdown
            </Button>
          )
        },

        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                [
                  { value: undefined, children: () => <div>FLURPY</div> },
                  { value: 'snurk', icon: 'AudioFile' },
                  { value: 'Selectings V!!!', icon: 'Close' },
                ],
                (value, index) => {
                  console.log('-->', value, index)
                },
                null,
                { multi: true }
              )}
            >
              Dropdown w/ special values
            </Button>
          )
        },
      ],
    },

    {
      name: 'menu',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              onClick={useMenu(
                () => {
                  const data = {
                    text: 'x',
                  }

                  return (
                    <>
                      <ContextualMenuItem
                        label="Flur"
                        onClick={useDropdown(
                          [
                            { label: 'hello', icon: 'skip' },
                            { label: 'bye', icon: 'smartCopy' },
                          ],
                          (value, index) => {
                            console.log('-->', value, index)
                          },
                          undefined,
                          { multi: true }
                        )}
                      />
                      <ContextualMenuItem label="Edit" icon="skip">
                        <ContextualMenuItem
                          border
                          label={`Edit ${data.text}`}
                          icon="search"
                          onClick={useModal(<Title>Modal!</Title>)}
                        />
                      </ContextualMenuItem>
                      <ContextualMenuItem border label="Delete" icon="close">
                        <div style={{ display: 'flex', padding: 20 }}>
                          <Button
                            onClick={useDropdown(
                              ['hello', 'bye!', 'snurky pants for you'],
                              (value, index) => {
                                console.log('-->', value, index)
                              }
                            )}
                          >
                            Remove this
                          </Button>
                        </div>
                        <Text style={{ padding: 35 }}>{randomLongText()}</Text>
                      </ContextualMenuItem>
                    </>
                  )
                },
                { width: 500 }
              )}
            >
              Contextual menu
            </Button>
          )
        },
        () => {
          return (
            <Button
              onClick={useMenu(
                () => {
                  const data = [
                    {
                      id: 'seCRSPFd',
                      name: 'Introduction testing',
                    },
                    {
                      id: 'se51088e5a',
                      name: 'Winario commercial 1',
                      startTime: 1631895392714,
                    },
                    {
                      id: 'se7a078522',
                      name: '1. Multitasking - Bushaltestelle - Beispiel',
                      startTime: 1631895327766,
                    },
                    {
                      id: 'seb62e857e',
                      name: '1. Multitasking - Bushaltestelle - Beispiel (Antwort)\n',
                    },
                    {
                      id: 'seB5cJgq',
                      name: 'Winario commercial 2',
                      startTime: 1631895393792,
                    },
                    {
                      id: 'se2eb1508d',
                      name: '1. Multitasking - Bushaltestelle - Q1',
                      startTime: 1631895406480,
                    },
                    {
                      id: 'se90dc9a62',
                      name: '1. Multitasking - Bushaltestelle - Q1 (Antwort)',
                    },
                    {
                      id: 'sefd1b776e',
                      name: '1. Multitasking - Bushaltestelle - Q2',
                      startTime: 1631895405425,
                    },
                    {
                      id: 'sef041fdfd',
                      name: '1. Multitasking - Bushaltestelle - Q2 (Antwort)',
                    },
                    {
                      id: 'se60a61815',
                      name: '1. Multitasking - Bushaltestelle - Q3',
                      startTime: 1631895557175,
                    },
                    {
                      id: 'see936ffda',
                      name: '1. Multitasking - Bushaltestelle - Q3 (Antwort)\n',
                    },
                    {
                      id: 'se6d0131a9',
                      name: '2. Sprache - Kurz und Knapp - Beispiel',
                      startTime: 1631897746567,
                    },
                    {
                      id: 'se0d0669c8',
                      name: '2. Sprache - Kurz und Knapp - Q1',
                      startTime: 1631898338873,
                    },
                    {
                      id: 'secb6b2651',
                      name: '2. Sprache - Kurz und Knapp - Q2',
                      startTime: 1631898361733,
                    },
                    {
                      id: 'se16993944',
                      name: '2. Sprache - Kurz und Knapp - Q3',
                      startTime: 1631898628580,
                    },
                    {
                      id: 'se8a129020',
                      name: '3. Sehen - Pi Mal Daumen - Beispiel',
                      startTime: 1631898639321,
                    },
                    {
                      id: 'seacab5cbe',
                      name: '3. Sehen - Pi Mal Daumen - Q1',
                      startTime: 1631898839561,
                    },
                    {
                      id: 'se3fbc458c',
                      name: '3. Sehen - Pi Mal Daumen - Q2',
                      startTime: 1631898837757,
                    },
                    {
                      id: 'se33a4d108',
                      name: '3. Sehen - Pi Mal Daumen - Q3',
                      startTime: 1631898836300,
                    },
                    {
                      id: 'se5cc284e4',
                      name: '4. Aus dem Leben - Aus dem Leben - Beispiel',
                      startTime: 1631898842070,
                    },
                    {
                      id: 'se24e5c267',
                      name: '4. Aus dem Leben - Aus dem Leben - Q1',
                    },
                    {
                      id: 'sef0316c07',
                      name: '4. Aus dem Leben - Aus dem Leben - Q2',
                    },
                    {
                      id: 'se0267b9d2',
                      name: '4. Aus dem Leben - Aus dem Leben - Q3',
                    },
                    {
                      id: 'se2f4ee461',
                      name: '5. Gedächtnis - Tierisch Prominent - Beispiel',
                    },
                    {
                      id: 'see6761969',
                      name: '5. Gedächtnis - Tierisch Prominent - Q1',
                    },
                    {
                      id: 'se5f1699a6',
                      name: '5. Gedächtnis - Tierisch Prominent - Q2',
                    },
                    {
                      id: 'se77139ca2',
                      name: '5. Gedächtnis - Tierisch Prominent - Q3',
                    },
                    {
                      id: 'sed9da5593',
                      name: '6. Hören - Verrückte Hits - Beispiel',
                    },
                    {
                      id: 'se81852bd2',
                      name: '6. Hören - Verrückte Hits - Q1',
                    },
                    {
                      id: 'se17e602ff',
                      name: '6. Hören - Verrückte Hits - Q2',
                    },
                    {
                      id: 'sedf46543a',
                      name: '6. Hören - Verrückte Hits - Q3',
                    },
                    {
                      id: 'se29a1e692',
                      name: '7. Logik - Na Logisch - Beispiel',
                    },
                    {
                      id: 'se3f797b1c',
                      name: '7. Logik - Na Logisch - Q1',
                    },
                    {
                      id: 'se12160abf',
                      name: '7. Logik - Na Logisch - Q2',
                    },
                    {
                      id: 'seedfc14bd',
                      name: '7. Logik - Na Logisch - Q3',
                    },
                    {
                      id: 'se0aa3ffef',
                      name: '8. Orientierung - Links oder Rechts - Beispiel',
                    },
                    {
                      id: 'se085111c9',
                      name: '8. Orientierung - Links oder Rechts - Q1',
                    },
                    {
                      id: 'se93497785',
                      name: '8. Orientierung - Links oder Rechts - Q2',
                    },
                    {
                      id: 'se6851ad40',
                      name: '8. Orientierung - Links oder Rechts - Q3',
                    },
                    {
                      id: 'sef5f5ef01',
                      name: 'E. Sehen - Nah Dran! - Beispiel',
                    },
                    {
                      id: 'sefc957f24',
                      name: 'E. Sehen - Nah Dran! - Q1',
                    },
                    {
                      id: 'se91126c08',
                      name: 'E. Sehen - Nah Dran! - Q2',
                    },
                    {
                      id: 'sea390e6bf',
                      name: 'E. Sehen - Nah Dran! - Q3',
                    },
                  ]

                  return data.map(({ id, name }, index) => {
                    return (
                      <ContextualMenuItem
                        key={id}
                        label={`${index + 1}. ${name}`}
                      />
                    )
                  })
                },
                { width: 500 }
              )}
            >
              Contextual menu
            </Button>
          )
        },
      ],
    },
  ],
}
