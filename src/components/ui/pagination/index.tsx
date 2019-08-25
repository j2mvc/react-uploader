
import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: 0,
            marginBottom: '5px',
            fontSize: '0.8em',
            alignItems: 'center',
            justifyContent: 'flex-start',
            display: 'flex',
            flexWrap: 'wrap',
            userSelect: 'none'
        },
        p: {
            display: 'flex',
            fontSize: '0.8em',
            padding: '2px 5px',
            margin: 2,
            borderRadius: 2,
            minWidth: 32,
            nowrap: 'true',
            textTransform: 'capitalize'
        },
        text: {
            fontSize: '0.8em',
            lineHeight: '32px',
            padding: theme.spacing(0, 1)
        },
        clearfix: {
            clear: 'both',
        },
        current: {
            display: 'flex',
            flexWrap: 'wrap',
            background: '#0066cc',
            fontSize: '0.8em',
            color: '#fff',
            padding: '2px 5px',
            borderRadius: 2,
            margin: 2,
            minWidth: 32
        },
        skip: {
            float: 'left',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: theme.spacing(1)
        },
        input: {
            float: 'left',
            padding: '3px 3px',
            border: '1px solid #dedede',
            borderRadius: 3,
            width: 30
        }
    }))
/**
 * 分页
 * @param props 
 */
const ListPagination = (props: any) => {
    const {
        total,
        page,
        pageSize,
        onPageChange,
        onPageSizeChange,
        maxShow
    } = props
    // 样式 
    const classes = useStyles()
    // 总页数
    const pageTotal = Math.floor(total / pageSize);
    const [newPage, setNewPage] = useState(page)
    const [newPageSize, setNewPageSize] = useState(pageSize)

    // 计算开始页号，结束页号
    const cal = (): any => {
        let max = maxShow % 2 == 0 ? maxShow + 1 : maxShow;
        let startpage = 1
        let endpage = max;
        let showNum = max;
        let halfNum = (max - 1) / 2; // 一半显示数量

        // stepNum:当前页前页数，或当前页后页数
        // 当前页号 - stepNum 大于1，开始页号为page-halfNum
        if (page - halfNum > 1) {
            startpage = page - halfNum;
        } else {
            startpage = 1;
        }
        // 当前页号 + stepNum 小于总页数，结束页号为page+halfNum
        if (page + halfNum < pageTotal) {
            endpage = page + halfNum;
        } else {
            endpage = pageTotal;
            // 开始页号大于总页数-showNum,且总页数大于showNum，开始页号为总页-showNum
            startpage = startpage > pageTotal - showNum && pageTotal > showNum ? pageTotal - showNum : startpage;
            // 结束页号小于showNum（每页页数）且小于总页数，结束页号showNum
            endpage = endpage < showNum && endpage < pageTotal ? showNum : endpage;
            endpage = endpage > pageTotal ? pageTotal : endpage;
        }
        return { startpage, endpage }
    }
    const { startpage, endpage } = cal()
    // 显示数字页号
    const renderNumpages = (props: any) => {

        const { startpage, endpage, page, onPageChange, classes } = props
        const nodes = []

        for (let i = startpage; i <= endpage; i++) {
            nodes.push(<Button
                key={i}
                variant="outlined"
                size="small"
                className={i === page ? classes.current : classes.p}
                onClick={() => {
                    onPageChange(i)
                }}>{i}</Button>)
        }
        return nodes
    }
    return (
        <Box className={classes.root}>
            {total > 0 && (
                <Box className={classes.text}>
                    共{total}条,
                    {page}/{pageTotal < page && total > 0 ? page : pageTotal}页.
                </Box>
            )}
            {page > 1 && (<>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(1)
                    }}>首页</Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(page - 1)
                    }}>上一页</Button>
            </>)}
            {startpage > 1 && (<>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(1)
                    }}>1</Button>
                <Box className={classes.text}>...</Box>
            </>)}
            {pageTotal > 1 && renderNumpages({
                startpage,
                endpage,
                page,
                onPageChange: (i: number) => {
                    onPageChange(i)
                },
                classes
            })}
            {endpage > 1 && endpage < pageTotal && (<>
                <Box className={classes.text}>...</Box>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(pageTotal)
                    }}>
                    {pageTotal}
                </Button>
            </>)}
            {page < pageTotal && (<>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(page + 1)
                    }}>下一页
                    </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.p}
                    onClick={() => {
                        onPageChange(pageTotal)
                    }}>尾页
                    </Button>
            </>)}
            {pageTotal > 1 && (
                <Box className={classes.skip}>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.p}
                        onClick={() => {
                            onPageChange(newPage)
                        }}>跳转</Button>
                    <Box component="span">
                        <input
                            type="number"
                            value={newPage}
                            className={classes.input}
                            onChange={(event: any) => {
                                if (event.target.value) {
                                    setNewPage(Number(event.target.value))
                                }
                            }}
                        />
                    </Box>
                </Box>
            )}
            {total > 0 && (
                <Box className={classes.skip}>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.p}
                        onClick={() => {
                            onPageSizeChange(newPageSize)
                        }}>每页条数</Button>
                    <Box component="span">
                        <input
                            type="number"
                            value={newPageSize}
                            className={classes.input}
                            onChange={(event: any) => {
                                if (event.target.value) {
                                    setNewPageSize(Number(event.target.value))
                                }
                            }}
                        />
                    </Box>
                </Box>)}
            <Box className={classes.clearfix}></Box>
        </Box>
    )
}
export default ListPagination