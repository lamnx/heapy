import { createMuiTheme } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';
import _ from 'lodash-core';

const overrides = {
    MuiPickersCalendarHeader: { //Увеличиваем шрифт в DateField
        switchHeader: {
            '& p': {
                fontSize: '1rem'
            }
        },
        dayLabel: { //Увеличиваем шрифт в DateField
            fontSize: '1rem'
        }
    },
    MuiPickersDay: { //Увеличиваем шрифт в DateField
        day: {
            fontSize: '1rem'
        }
    },
    MuiFormLabel: {
        asterisk: {
            color: '#ED5565'
        },
        root: {
            letterSpacing: 0
        }
    },
    MuiTooltip: {
        tooltip: {
            fontSize: '0.85rem'
        }
    },
    MuiTableCell: {
        head: {
            fontSize: '0.95rem',
                lineHeight: 'normal'
        },
        root: {
            fontSize: '0.95rem',
                lineHeight: 'normal',
                letterSpacing: 0
        },
        body: {
            fontSize: '0.95rem'
        }
    },
    MuiTablePagination: {
        caption: {
            fontSize: '0.95rem',
                lineHeight: 'normal',
                letterSpacing: 0
        }
    },
    MuiSvgIcon: {
        root: {
            fontSize: '1.7143rem'
        }
    },
    MuiTypography: {
        body1: {
            fontSize: '0.875rem'
        }
    },
    MuiFormHelperText: {
        root: {
            letterSpacing: 0
        }
    },
    MuiButton: {
        label: {
            letterSpacing: 0
        },
        text: {
            padding: '8px 16px'
        },
        root: {
            minHeight: 36,
                lineHeight: 'normal',
                letterSpacing: 0
        }
    },
    MuiListItemText: {
        root: {
            marginTop: 0,
                marginBottom: 0
        },
        multiline: {
            marginTop: 0,
                marginBottom: 0
        }
    }
};

const palette = {
    primary: {
        // light: will be calculated from palette.primary.main,
        main: '#2f4050',
        dark: '#293846',
        // contrastText: will be calculated to contrast with palette.primary.main
        text: {
            light: '#FFF',
            main: '#DFE4ED',
            dark: '#A7B1C2'
        }
    },
    secondary: {
        //  light: '#0066FF',
        main: '#1AB394',
        // dark: will be calculated from palette.secondary.main,
        //  contrastText: '#F8AC59',
        text: '#FFF'
    },
    error: {
        main: '#ED5565'
    },
    warning: {
        main: '#FF9100'
    },
    background: {
        light: '#FFF',
        main: grey[50],
        dark: grey[200],
        text: {
            light: '#888888',
            main: '#676A6C',
            dark: '#000'
        }
    },
    common: {
        link: '#337AB7',
        blueButton: '#1C84C6',
    }
};

export default createMuiTheme({
    palette: _.merge(palette, {
        secondary: {
            main: '#FF9100',
            text: '#FFF'
        },
        success: {
            main: '#1AB394'
        },
        select: {
            main: '#1A7BB9'
        },
    }),
    overrides: _.merge(overrides, {
        MuiTableRow: {
            root: {
                '&$selected': {
                    backgroundColor: grey[300]
                }
            }
        },
    })
});