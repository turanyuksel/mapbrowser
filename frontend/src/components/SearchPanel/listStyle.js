/*
  Adapted from: https://developer.microsoft.com/en-us/fabric#/controls/web/list
*/
import { mergeStyleSets, getTheme, getFocusStyle } from '@uifabric/styling';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;

export const classNames = {
  list: mergeStyleSets({
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        textAlign: 'left',
        minHeight: 54,
        padding: 10,
        boxSizing: 'border-box',
        borderBottom: `1px solid ${semanticColors.bodyDivider}`,
        display: 'flex',
        selectors: {
          '&:hover': { background: palette.neutralLight }
        }
      }
    ],
    itemContent: {
      marginLeft: 10,
      overflow: 'hidden',
      flexGrow: 1
    },
    itemName: [
      fonts.xLarge,
      {
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ]
  })
};

export const styles = {
  searchBox: {
    zIndex: 999,
    position: "absolute",
    left: "32px",
    top: "32px",
    width: "368px"
  },
  searchResultBox: {
    zIndex: 998,
    position: "absolute",
    left: '0px',
    top: '0px',
    width: '400px',
    bottom: '0px',
    paddingTop: '64px',
    backgroundColor: 'rgb(66,133,244)'
  },
  searchItemsBox: {
    zIndex: 999,
    position: 'absolute',
    left: '0px',
    top: '100px',
    width: '400px',
    bottom: '0px',
    backgroundColor: 'rgb(255,255,255)',
    overflowY: 'scroll'
  },
};
