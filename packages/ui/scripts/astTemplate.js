module.exports = (ast, componentName) => {
  return [
    {
      type: 'ImportDeclaration',
      start: 2,
      end: 28,
      loc: {
        start: {
          line: 1,
          column: 2,
        },
        end: {
          line: 1,
          column: 28,
        },
      },
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          start: 9,
          end: 14,
          loc: {
            start: {
              line: 1,
              column: 9,
            },
            end: {
              line: 1,
              column: 14,
            },
          },
          local: {
            type: 'Identifier',
            start: 9,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 9,
              },
              end: {
                line: 1,
                column: 14,
              },
              identifierName: 'React',
            },
            name: 'React',
          },
        },
      ],
      importKind: 'value',
      source: {
        type: 'StringLiteral',
        start: 20,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 20,
          },
          end: {
            line: 1,
            column: 27,
          },
        },
        extra: {
          rawValue: 'react',
          raw: "'react'",
        },
        value: 'react',
      },
      assertions: [],
    },
    {
      type: 'ImportDeclaration',
      start: 31,
      end: 68,
      loc: {
        start: {
          line: 2,
          column: 2,
        },
        end: {
          line: 2,
          column: 39,
        },
      },
      specifiers: [
        {
          type: 'ImportSpecifier',
          start: 40,
          end: 49,
          loc: {
            start: {
              line: 2,
              column: 11,
            },
            end: {
              line: 2,
              column: 20,
            },
          },
          imported: {
            type: 'Identifier',
            start: 40,
            end: 49,
            loc: {
              start: {
                line: 2,
                column: 11,
              },
              end: {
                line: 2,
                column: 20,
              },
              identifierName: 'IconProps',
            },
            name: 'IconProps',
          },
          importKind: null,
          local: {
            type: 'Identifier',
            start: 40,
            end: 49,
            loc: {
              start: {
                line: 2,
                column: 11,
              },
              end: {
                line: 2,
                column: 20,
              },
              identifierName: 'IconProps',
            },
            name: 'IconProps',
          },
        },
      ],
      importKind: 'value',
      source: {
        type: 'StringLiteral',
        start: 57,
        end: 67,
        loc: {
          start: {
            line: 2,
            column: 28,
          },
          end: {
            line: 2,
            column: 38,
          },
        },
        extra: {
          rawValue: '../types',
          raw: "'../types'",
        },
        value: '../types',
      },
      assertions: [],
    },
    {
      type: 'ImportDeclaration',
      start: 71,
      end: 108,
      loc: {
        start: {
          line: 3,
          column: 2,
        },
        end: {
          line: 3,
          column: 39,
        },
      },
      specifiers: [
        {
          type: 'ImportSpecifier',
          start: 80,
          end: 87,
          loc: {
            start: {
              line: 3,
              column: 11,
            },
            end: {
              line: 3,
              column: 18,
            },
          },
          imported: {
            type: 'Identifier',
            start: 80,
            end: 87,
            loc: {
              start: {
                line: 3,
                column: 11,
              },
              end: {
                line: 3,
                column: 18,
              },
              identifierName: 'Wrapper',
            },
            name: 'Wrapper',
          },
          importKind: null,
          local: {
            type: 'Identifier',
            start: 80,
            end: 87,
            loc: {
              start: {
                line: 3,
                column: 11,
              },
              end: {
                line: 3,
                column: 18,
              },
              identifierName: 'Wrapper',
            },
            name: 'Wrapper',
          },
        },
      ],
      importKind: 'value',
      source: {
        type: 'StringLiteral',
        start: 95,
        end: 107,
        loc: {
          start: {
            line: 3,
            column: 26,
          },
          end: {
            line: 3,
            column: 38,
          },
        },
        extra: {
          rawValue: '../Wrapper',
          raw: "'../Wrapper'",
        },
        value: '../Wrapper',
      },
      assertions: [],
    },
    {
      type: 'VariableDeclaration',
      start: 114,
      end: 412,
      loc: {
        start: {
          line: 5,
          column: 2,
        },
        end: {
          line: 15,
          column: 3,
        },
      },
      declarations: [
        {
          type: 'VariableDeclarator',
          start: 120,
          end: 412,
          loc: {
            start: {
              line: 5,
              column: 8,
            },
            end: {
              line: 15,
              column: 3,
            },
          },
          id: {
            type: 'Identifier',
            start: 120,
            end: 124,
            loc: {
              start: {
                line: 5,
                column: 8,
              },
              end: {
                line: 5,
                column: 12,
              },
              identifierName: componentName,
            },
            name: componentName,
          },
          init: {
            type: 'ArrowFunctionExpression',
            start: 127,
            end: 412,
            loc: {
              start: {
                line: 5,
                column: 15,
              },
              end: {
                line: 15,
                column: 3,
              },
            },
            id: null,
            generator: false,
            async: false,
            params: [
              {
                type: 'Identifier',
                start: 128,
                end: 140,
                loc: {
                  start: {
                    line: 5,
                    column: 16,
                  },
                  end: {
                    line: 5,
                    column: 28,
                  },
                  identifierName: 'x',
                },
                name: 'x',
                typeAnnotation: {
                  type: 'TypeAnnotation',
                  start: 129,
                  end: 140,
                  loc: {
                    start: {
                      line: 5,
                      column: 17,
                    },
                    end: {
                      line: 5,
                      column: 28,
                    },
                  },
                  typeAnnotation: {
                    type: 'GenericTypeAnnotation',
                    start: 131,
                    end: 140,
                    loc: {
                      start: {
                        line: 5,
                        column: 19,
                      },
                      end: {
                        line: 5,
                        column: 28,
                      },
                    },
                    typeParameters: null,
                    id: {
                      type: 'Identifier',
                      start: 131,
                      end: 140,
                      loc: {
                        start: {
                          line: 5,
                          column: 19,
                        },
                        end: {
                          line: 5,
                          column: 28,
                        },
                        identifierName: 'IconProps',
                      },
                      name: 'IconProps',
                    },
                  },
                },
              },
            ],
            body: {
              type: 'BlockStatement',
              start: 145,
              end: 412,
              loc: {
                start: {
                  line: 5,
                  column: 33,
                },
                end: {
                  line: 15,
                  column: 3,
                },
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 151,
                  end: 192,
                  loc: {
                    start: {
                      line: 6,
                      column: 4,
                    },
                    end: {
                      line: 6,
                      column: 45,
                    },
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 155,
                      end: 192,
                      loc: {
                        start: {
                          line: 6,
                          column: 8,
                        },
                        end: {
                          line: 6,
                          column: 45,
                        },
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 155,
                        end: 188,
                        loc: {
                          start: {
                            line: 6,
                            column: 8,
                          },
                          end: {
                            line: 6,
                            column: 41,
                          },
                        },
                        properties: [
                          {
                            type: 'ObjectProperty',
                            start: 157,
                            end: 162,
                            loc: {
                              start: {
                                line: 6,
                                column: 10,
                              },
                              end: {
                                line: 6,
                                column: 15,
                              },
                            },
                            key: {
                              type: 'Identifier',
                              start: 157,
                              end: 162,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 10,
                                },
                                end: {
                                  line: 6,
                                  column: 15,
                                },
                                identifierName: 'color',
                              },
                              name: 'color',
                            },
                            computed: false,
                            method: false,
                            shorthand: true,
                            value: {
                              type: 'Identifier',
                              start: 157,
                              end: 162,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 10,
                                },
                                end: {
                                  line: 6,
                                  column: 15,
                                },
                                identifierName: 'color',
                              },
                              name: 'color',
                            },
                            extra: {
                              shorthand: true,
                            },
                          },
                          {
                            type: 'ObjectProperty',
                            start: 164,
                            end: 167,
                            loc: {
                              start: {
                                line: 6,
                                column: 17,
                              },
                              end: {
                                line: 6,
                                column: 20,
                              },
                            },
                            key: {
                              type: 'Identifier',
                              start: 164,
                              end: 167,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 17,
                                },
                                end: {
                                  line: 6,
                                  column: 20,
                                },
                                identifierName: 'css',
                              },
                              name: 'css',
                            },
                            computed: false,
                            method: false,
                            shorthand: true,
                            value: {
                              type: 'Identifier',
                              start: 164,
                              end: 167,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 17,
                                },
                                end: {
                                  line: 6,
                                  column: 20,
                                },
                                identifierName: 'css',
                              },
                              name: 'css',
                            },
                            extra: {
                              shorthand: true,
                            },
                          },
                          {
                            type: 'ObjectProperty',
                            start: 169,
                            end: 176,
                            loc: {
                              start: {
                                line: 6,
                                column: 22,
                              },
                              end: {
                                line: 6,
                                column: 29,
                              },
                            },
                            key: {
                              type: 'Identifier',
                              start: 169,
                              end: 176,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 22,
                                },
                                end: {
                                  line: 6,
                                  column: 29,
                                },
                                identifierName: 'onClick',
                              },
                              name: 'onClick',
                            },
                            computed: false,
                            method: false,
                            shorthand: true,
                            value: {
                              type: 'Identifier',
                              start: 169,
                              end: 176,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 22,
                                },
                                end: {
                                  line: 6,
                                  column: 29,
                                },
                                identifierName: 'onClick',
                              },
                              name: 'onClick',
                            },
                            extra: {
                              shorthand: true,
                            },
                          },
                          {
                            type: 'RestElement',
                            start: 178,
                            end: 186,
                            loc: {
                              start: {
                                line: 6,
                                column: 31,
                              },
                              end: {
                                line: 6,
                                column: 39,
                              },
                            },
                            argument: {
                              type: 'Identifier',
                              start: 181,
                              end: 186,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 34,
                                },
                                end: {
                                  line: 6,
                                  column: 39,
                                },
                                identifierName: 'props',
                              },
                              name: 'props',
                            },
                          },
                        ],
                      },
                      init: {
                        type: 'Identifier',
                        start: 191,
                        end: 192,
                        loc: {
                          start: {
                            line: 6,
                            column: 44,
                          },
                          end: {
                            line: 6,
                            column: 45,
                          },
                          identifierName: 'x',
                        },
                        name: 'x',
                      },
                    },
                  ],
                  kind: 'let',
                },
                {
                  type: 'IfStatement',
                  start: 264,
                  end: 293,
                  loc: {
                    start: {
                      line: 10,
                      column: 4,
                    },
                    end: {
                      line: 10,
                      column: 33,
                    },
                  },
                  test: {
                    type: 'UnaryExpression',
                    start: 268,
                    end: 272,
                    loc: {
                      start: {
                        line: 10,
                        column: 8,
                      },
                      end: {
                        line: 10,
                        column: 12,
                      },
                    },
                    operator: '!',
                    prefix: true,
                    argument: {
                      type: 'Identifier',
                      start: 269,
                      end: 272,
                      loc: {
                        start: {
                          line: 10,
                          column: 9,
                        },
                        end: {
                          line: 10,
                          column: 12,
                        },
                        identifierName: 'css',
                      },
                      name: 'css',
                    },
                  },
                  consequent: {
                    type: 'BlockStatement',
                    start: 274,
                    end: 293,
                    loc: {
                      start: {
                        line: 10,
                        column: 14,
                      },
                      end: {
                        line: 10,
                        column: 33,
                      },
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 276,
                        end: 291,
                        loc: {
                          start: {
                            line: 10,
                            column: 16,
                          },
                          end: {
                            line: 10,
                            column: 31,
                          },
                        },
                        expression: {
                          type: 'AssignmentExpression',
                          start: 276,
                          end: 291,
                          loc: {
                            start: {
                              line: 10,
                              column: 16,
                            },
                            end: {
                              line: 10,
                              column: 31,
                            },
                          },
                          operator: '=',
                          left: {
                            type: 'Identifier',
                            start: 276,
                            end: 279,
                            loc: {
                              start: {
                                line: 10,
                                column: 16,
                              },
                              end: {
                                line: 10,
                                column: 19,
                              },
                              identifierName: 'css',
                            },
                            name: 'css',
                          },
                          right: {
                            type: 'ObjectExpression',
                            start: 282,
                            end: 291,
                            loc: {
                              start: {
                                line: 10,
                                column: 22,
                              },
                              end: {
                                line: 10,
                                column: 31,
                              },
                            },
                            properties: [
                              {
                                type: 'ObjectProperty',
                                start: 284,
                                end: 289,
                                loc: {
                                  start: {
                                    line: 10,
                                    column: 24,
                                  },
                                  end: {
                                    line: 10,
                                    column: 29,
                                  },
                                },
                                method: false,
                                key: {
                                  type: 'Identifier',
                                  start: 284,
                                  end: 289,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 24,
                                    },
                                    end: {
                                      line: 10,
                                      column: 29,
                                    },
                                    identifierName: 'color',
                                  },
                                  name: 'color',
                                },
                                computed: false,
                                shorthand: true,
                                value: {
                                  type: 'Identifier',
                                  start: 284,
                                  end: 289,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 24,
                                    },
                                    end: {
                                      line: 10,
                                      column: 29,
                                    },
                                    identifierName: 'color',
                                  },
                                  name: 'color',
                                },
                                extra: {
                                  shorthand: true,
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                    directives: [],
                  },
                  alternate: null,
                },
                {
                  type: 'IfStatement',
                  start: 298,
                  end: 345,
                  loc: {
                    start: {
                      line: 11,
                      column: 4,
                    },
                    end: {
                      line: 13,
                      column: 5,
                    },
                  },
                  test: {
                    type: 'UnaryExpression',
                    start: 302,
                    end: 312,
                    loc: {
                      start: {
                        line: 11,
                        column: 8,
                      },
                      end: {
                        line: 11,
                        column: 18,
                      },
                    },
                    operator: '!',
                    prefix: true,
                    argument: {
                      type: 'MemberExpression',
                      start: 303,
                      end: 312,
                      loc: {
                        start: {
                          line: 11,
                          column: 9,
                        },
                        end: {
                          line: 11,
                          column: 18,
                        },
                      },
                      object: {
                        type: 'Identifier',
                        start: 303,
                        end: 306,
                        loc: {
                          start: {
                            line: 11,
                            column: 9,
                          },
                          end: {
                            line: 11,
                            column: 12,
                          },
                          identifierName: 'css',
                        },
                        name: 'css',
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        start: 307,
                        end: 312,
                        loc: {
                          start: {
                            line: 11,
                            column: 13,
                          },
                          end: {
                            line: 11,
                            column: 18,
                          },
                          identifierName: 'color',
                        },
                        name: 'color',
                      },
                    },
                  },
                  consequent: {
                    type: 'BlockStatement',
                    start: 314,
                    end: 345,
                    loc: {
                      start: {
                        line: 11,
                        column: 20,
                      },
                      end: {
                        line: 13,
                        column: 5,
                      },
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 322,
                        end: 339,
                        loc: {
                          start: {
                            line: 12,
                            column: 6,
                          },
                          end: {
                            line: 12,
                            column: 23,
                          },
                        },
                        expression: {
                          type: 'AssignmentExpression',
                          start: 322,
                          end: 339,
                          loc: {
                            start: {
                              line: 12,
                              column: 6,
                            },
                            end: {
                              line: 12,
                              column: 23,
                            },
                          },
                          operator: '=',
                          left: {
                            type: 'MemberExpression',
                            start: 322,
                            end: 331,
                            loc: {
                              start: {
                                line: 12,
                                column: 6,
                              },
                              end: {
                                line: 12,
                                column: 15,
                              },
                            },
                            object: {
                              type: 'Identifier',
                              start: 322,
                              end: 325,
                              loc: {
                                start: {
                                  line: 12,
                                  column: 6,
                                },
                                end: {
                                  line: 12,
                                  column: 9,
                                },
                                identifierName: 'css',
                              },
                              name: 'css',
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              start: 326,
                              end: 331,
                              loc: {
                                start: {
                                  line: 12,
                                  column: 10,
                                },
                                end: {
                                  line: 12,
                                  column: 15,
                                },
                                identifierName: 'color',
                              },
                              name: 'color',
                            },
                          },
                          right: {
                            type: 'Identifier',
                            start: 334,
                            end: 339,
                            loc: {
                              start: {
                                line: 12,
                                column: 18,
                              },
                              end: {
                                line: 12,
                                column: 23,
                              },
                              identifierName: 'color',
                            },
                            name: 'color',
                          },
                        },
                      },
                    ],
                    directives: [],
                  },
                  alternate: null,
                },
                {
                  type: 'ReturnStatement',
                  start: 350,
                  end: 408,
                  loc: {
                    start: {
                      line: 14,
                      column: 4,
                    },
                    end: {
                      line: 14,
                      column: 62,
                    },
                  },
                  argument: {
                    type: 'JSXElement',
                    start: 357,
                    end: 408,
                    loc: {
                      start: {
                        line: 14,
                        column: 11,
                      },
                      end: {
                        line: 14,
                        column: 62,
                      },
                    },
                    openingElement: {
                      type: 'JSXOpeningElement',
                      start: 357,
                      end: 394,
                      loc: {
                        start: {
                          line: 14,
                          column: 11,
                        },
                        end: {
                          line: 14,
                          column: 48,
                        },
                      },
                      name: {
                        type: 'JSXIdentifier',
                        start: 358,
                        end: 365,
                        loc: {
                          start: {
                            line: 14,
                            column: 12,
                          },
                          end: {
                            line: 14,
                            column: 19,
                          },
                        },
                        name: 'Wrapper',
                      },
                      attributes: [
                        {
                          type: 'JSXAttribute',
                          start: 366,
                          end: 383,
                          loc: {
                            start: {
                              line: 14,
                              column: 20,
                            },
                            end: {
                              line: 14,
                              column: 37,
                            },
                          },
                          name: {
                            type: 'JSXIdentifier',
                            start: 366,
                            end: 373,
                            loc: {
                              start: {
                                line: 14,
                                column: 20,
                              },
                              end: {
                                line: 14,
                                column: 27,
                              },
                            },
                            name: 'onClick',
                          },
                          value: {
                            type: 'JSXExpressionContainer',
                            start: 374,
                            end: 383,
                            loc: {
                              start: {
                                line: 14,
                                column: 28,
                              },
                              end: {
                                line: 14,
                                column: 37,
                              },
                            },
                            expression: {
                              type: 'Identifier',
                              start: 375,
                              end: 382,
                              loc: {
                                start: {
                                  line: 14,
                                  column: 29,
                                },
                                end: {
                                  line: 14,
                                  column: 36,
                                },
                                identifierName: 'onClick',
                              },
                              name: 'onClick',
                            },
                          },
                        },
                        {
                          type: 'JSXAttribute',
                          start: 384,
                          end: 393,
                          loc: {
                            start: {
                              line: 14,
                              column: 38,
                            },
                            end: {
                              line: 14,
                              column: 47,
                            },
                          },
                          name: {
                            type: 'JSXIdentifier',
                            start: 384,
                            end: 387,
                            loc: {
                              start: {
                                line: 14,
                                column: 38,
                              },
                              end: {
                                line: 14,
                                column: 41,
                              },
                            },
                            name: 'css',
                          },
                          value: {
                            type: 'JSXExpressionContainer',
                            start: 388,
                            end: 393,
                            loc: {
                              start: {
                                line: 14,
                                column: 42,
                              },
                              end: {
                                line: 14,
                                column: 47,
                              },
                            },
                            expression: {
                              type: 'Identifier',
                              start: 389,
                              end: 392,
                              loc: {
                                start: {
                                  line: 14,
                                  column: 43,
                                },
                                end: {
                                  line: 14,
                                  column: 46,
                                },
                                identifierName: 'css',
                              },
                              name: 'css',
                            },
                          },
                        },
                      ],
                      selfClosing: false,
                    },
                    closingElement: {
                      type: 'JSXClosingElement',
                      start: 398,
                      end: 408,
                      loc: {
                        start: {
                          line: 14,
                          column: 52,
                        },
                        end: {
                          line: 14,
                          column: 62,
                        },
                      },
                      name: {
                        type: 'JSXIdentifier',
                        start: 400,
                        end: 407,
                        loc: {
                          start: {
                            line: 14,
                            column: 54,
                          },
                          end: {
                            line: 14,
                            column: 61,
                          },
                        },
                        name: 'Wrapper',
                      },
                    },
                    children: [ast],
                  },
                },
              ],
              directives: [],
            },
          },
        },
      ],
      kind: 'const',
    },
    {
      type: 'ExportDefaultDeclaration',
      start: 415,
      end: 435,
      loc: {
        start: {
          line: 16,
          column: 2,
        },
        end: {
          line: 16,
          column: 22,
        },
      },
      declaration: {
        type: 'Identifier',
        start: 430,
        end: 434,
        loc: {
          start: {
            line: 16,
            column: 17,
          },
          end: {
            line: 16,
            column: 21,
          },
          identifierName: componentName,
        },
        name: componentName,
      },
    },
  ]
}
