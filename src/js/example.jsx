
import BarChartRangeSelector from './bar-chart-range-selector.jsx';
import React from 'react';


export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTimeRange: [617, 622]
    };
  }

  handleTimeRangeChange(range) {
    this.setState({selectedTimeRange: range});
  }

  render() {
    return (
      <div>
        <h3>Example of bar chart range selector</h3>
        <p>Selected: {this.state.selectedTimeRange[0]} to {this.state.selectedTimeRange[1]}</p>
        <BarChartRangeSelector
          onChange={this.handleTimeRangeChange.bind(this)}
          data={this.getData()}
          width={800}
          selectedRange={this.state.selectedTimeRange} />
      </div>
    );
  }

  getData() {
    return [
      {
        'key': '606',
        'values': [
          {
            'key': 'Foo',
            'values': 4
          },
          {
            'key': 'Bar',
            'values': 30
          },
          {
            'key': 'Baz',
            'values': 10
          },
          {
            'key': 'Hey',
            'values': 14
          }
        ],
        'total': 58
      },
      {
        'key': '607',
        'values': [
          {
            'key': 'Foo',
            'values': 4
          },
          {
            'key': 'Bar',
            'values': 10
          },
          {
            'key': 'Baz',
            'values': 16
          },
          {
            'key': 'Hey',
            'values': 18
          }
        ],
        'total': 48
      },
      {
        'key': '608',
        'values': [
          {
            'key': 'Foo',
            'values': 2
          },
          {
            'key': 'Bar',
            'values': 11
          },
          {
            'key': 'Baz',
            'values': 14
          },
          {
            'key': 'Hey',
            'values': 44
          }
        ],
        'total': 71
      },
      {
        'key': '609',
        'values': [
          {
            'key': 'Foo',
            'values': 2
          },
          {
            'key': 'Bar',
            'values': 19
          },
          {
            'key': 'Baz',
            'values': 20
          },
          {
            'key': 'Hey',
            'values': 8
          }
        ],
        'total': 49
      },
      {
        'key': '610',
        'values': [
          {
            'key': 'Foo',
            'values': 5
          },
          {
            'key': 'Bar',
            'values': 14
          },
          {
            'key': 'Baz',
            'values': 16
          },
          {
            'key': 'Hey',
            'values': 15
          }
        ],
        'total': 50
      },
      {
        'key': '611',
        'values': [
          {
            'key': 'Foo',
            'values': 5
          },
          {
            'key': 'Bar',
            'values': 19
          },
          {
            'key': 'Baz',
            'values': 12
          },
          {
            'key': 'Hey',
            'values': 16
          }
        ],
        'total': 52
      },
      {
        'key': '612',
        'values': [
          {
            'key': 'Foo',
            'values': 8
          },
          {
            'key': 'Bar',
            'values': 30
          },
          {
            'key': 'Baz',
            'values': 10
          },
          {
            'key': 'Hey',
            'values': 21
          }
        ],
        'total': 69
      },
      {
        'key': '613',
        'values': [
          {
            'key': 'Foo',
            'values': 5
          },
          {
            'key': 'Bar',
            'values': 18
          },
          {
            'key': 'Baz',
            'values': 13
          },
          {
            'key': 'Hey',
            'values': 16
          }
        ],
        'total': 52
      },
      {
        'key': '614',
        'values': [
          {
            'key': 'Foo',
            'values': 16
          },
          {
            'key': 'Bar',
            'values': 24
          },
          {
            'key': 'Baz',
            'values': 19
          },
          {
            'key': 'Hey',
            'values': 16
          }
        ],
        'total': 75
      },
      {
        'key': '615',
        'values': [
          {
            'key': 'Foo',
            'values': 2
          },
          {
            'key': 'Bar',
            'values': 19
          },
          {
            'key': 'Baz',
            'values': 6
          },
          {
            'key': 'Hey',
            'values': 24
          }
        ],
        'total': 51
      },
      {
        'key': '616',
        'values': [
          {
            'key': 'Foo',
            'values': 3
          },
          {
            'key': 'Bar',
            'values': 27
          },
          {
            'key': 'Baz',
            'values': 18
          },
          {
            'key': 'Hey',
            'values': 19
          }
        ],
        'total': 67
      },
      {
        'key': '617',
        'values': [
          {
            'key': 'Foo',
            'values': 12
          },
          {
            'key': 'Bar',
            'values': 21
          },
          {
            'key': 'Baz',
            'values': 21
          },
          {
            'key': 'Hey',
            'values': 41
          }
        ],
        'total': 95
      },
      {
        'key': '618',
        'values': [
          {
            'key': 'Foo',
            'values': 11
          },
          {
            'key': 'Bar',
            'values': 25
          },
          {
            'key': 'Baz',
            'values': 19
          },
          {
            'key': 'Hey',
            'values': 21
          }
        ],
        'total': 76
      },
      {
        'key': '619',
        'values': [
          {
            'key': 'Foo',
            'values': 4
          },
          {
            'key': 'Bar',
            'values': 26
          },
          {
            'key': 'Baz',
            'values': 18
          },
          {
            'key': 'Hey',
            'values': 25
          }
        ],
        'total': 73
      },
      {
        'key': '620',
        'values': [
          {
            'key': 'Foo',
            'values': 4
          },
          {
            'key': 'Bar',
            'values': 17
          },
          {
            'key': 'Baz',
            'values': 14
          },
          {
            'key': 'Hey',
            'values': 13
          }
        ],
        'total': 48
      },
      {
        'key': '621',
        'values': [
          {
            'key': 'Foo',
            'values': 6
          },
          {
            'key': 'Bar',
            'values': 28
          },
          {
            'key': 'Baz',
            'values': 9
          },
          {
            'key': 'Hey',
            'values': 34
          }
        ],
        'total': 77
      },
      {
        'key': '622',
        'values': [
          {
            'key': 'Foo',
            'values': 5
          },
          {
            'key': 'Bar',
            'values': 6
          },
          {
            'key': 'Baz',
            'values': 15
          },
          {
            'key': 'Hey',
            'values': 38
          }
        ],
        'total': 81
      },
      {
        'key': '623',
        'values': [
          {
            'key': 'Foo',
            'values': 4
          },
          {
            'key': 'Bar',
            'values': 26
          },
          {
            'key': 'Baz',
            'values': 18
          },
          {
            'key': 'Hey',
            'values': 26
          }
        ],
        'total': 74
      }
    ];
  }

}

Example.prototype.displayName = 'Example';
