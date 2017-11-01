export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'app-scm-voucher-card',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'app-scm-voucher-card-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'softly',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'softly',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}, {
					name: 'setting',
					component: 'Button',
					className: 'app-scm-voucher-card-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'setting',
					title: '设置',
					onClick: '{{$setting}}'
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'showy',
					onClick: '{{$add}}',
					children: '新增'
				}, {
					name: 'audit',
					component: 'Button',
					type: 'bluesky',
					disabled: '{{!!data.form.isAudit || !data.form.id}}',
					onClick: '{{$audit}}',
					children: '审核'
				}, {
					name: 'history',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$history}}',
					children: '历史单据'
				}, {
					name: 'more',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$moreMenuClick}}',
						children: [{
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							disabled: '{{!!data.form.isAudit || !data.form.id}}',
							children: '删除'
						}, {
							name: 'reject',
							component: 'Menu.Item',
							key: 'reject',
							children: '生成红字销售发票'
						}, {
							name: 'receipt',
							component: 'Menu.Item',
							key: 'receipt',
							children: '收款'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['更多', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}]
			}]
		}, {
			name: 'title',
			component: 'Layout',
			className: 'app-scm-voucher-card-title',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-title-left',
				children: [{
					name: 'audited',
					component: '::div',
					className: 'app-scm-voucher-card-title-left-tag',
					children: '已审核',
					_visible: '{{!!data.form.isAudit}}'
				}]
			}, {
				name: 'center',
				component: '::div',
				className: 'app-scm-voucher-card-title-center',
				children: {
					name: 'title',
					component: '::h1',
					children: '销售单'
				}
			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-title-right',
				children: ['单据编号:', {
					name: 'code',
					component: '::div',
					style: { marginRight: 10 },
					children: "{{data.form.code || '1001'}}"
				}, {
						name: 'attachment',
						component: 'Popover',
						trigger: 'click',
						placement: 'bottomRight',
						children: [{
							name: 'a',
							component: '::a',
							children: '附件:0'
						}]
					}]
			}]
		}, {
			name: 'formHeader',
			component: 'Form',
			className: 'app-scm-voucher-card-form-header',
			children: [{
				name: 'customerItem',
				component: 'Form.Item',
				required: true,
				//validateStatus: 'info',
				//help: '应收余额:0.00',
				label: '客户',
				children: [{
					name: 'customer',
					component: 'Select',
					placeholder: '按名称/拼音搜索',
					showSearch: true,
					value: '{{data.form.customer && data.form.customer.id }}',
					onChange: `{{(v)=>$sf('data.form.customer', $fromJS(data.other.customers.find(o=>o.id==v),null))}}`,
					onFocus: "{{$customerFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.customers && data.other.customers[_rowIndex].id }}",
						children: '{{data.other.customers && data.other.customers[_rowIndex].name }}',
						_power: 'for in data.other.customers'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addCustomer}}'
					},
				}]
			}, {
				name: 'dateItem',
				component: 'Form.Item',
				label: '单据日期',
				required: true,
				children: [{
					name: 'date',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.date)}}',
					onChange: "{{(d)=>$sf('data.form.date',$momentToString(d,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'ticketTypeItem',
				component: 'Form.Item',
				label: '票据类型',
				required: true,
				children: [{
					name: 'ticketType',
					component: 'Select',
					showSearch: false,
					value: '{{data.form.ticketType && data.form.ticketType.id }}',
					onChange: `{{(v)=>$sf('data.form.ticketType', $fromJS(data.other.ticketTypes.find(o=>o.id==v),null))}}`,
					onFocus: "{{$ticketTypeFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.ticketTypes && data.other.ticketTypes[_rowIndex].id }}",
						children: '{{data.other.ticketTypes && data.other.ticketTypes[_rowIndex].name }}',
						_power: 'for in data.other.ticketTypes'
					}
				}]
			}, {
				name: 'warehouseItem',
				component: 'Form.Item',
				label: '仓库',
				required: true,
				children: [{
					name: 'warehouse',
					component: 'Select',
					showSearch: false,
					value: '{{data.form.warehouse && data.form.warehouse.id }}',
					onChange: `{{(v)=>$sf('data.form.warehouse', $fromJS(data.other.warehouses.find(o=>o.id==v),null))}}`,
					onFocus: "{{$warehouseFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.warehouses && data.other.warehouses[_rowIndex].id }}",
						children: '{{data.other.warehouses && data.other.warehouses[_rowIndex].name }}',
						_power: 'for in data.other.warehouses'
					}
				}]
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				required: true,
				validateStatus: 'info',
				label: '部门',
				children: [{
					name: 'department',
					component: 'Select',
					showSearch: true,
					value: '{{data.form.department && data.form.department.id }}',
					onChange: `{{(v)=>$sf('data.form.department', $fromJS(data.other.department.find(o=>o.id==v),null))}}`,
					onFocus: "{{$departmentFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.department && data.other.department[_rowIndex].id }}",
						children: '{{data.other.department && data.other.department[_rowIndex].name }}',
						_power: 'for in data.other.department'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
				}]
			}, {
				name: 'projectItem',
				component: 'Form.Item',
				required: true,
				validateStatus: 'info',
				label: '项目',
				children: [{
					name: 'project',
					component: 'Select',
					showSearch: true,
					value: '{{data.form.project && data.form.project.id }}',
					onChange: `{{(v)=>$sf('data.form.project', $fromJS(data.other.project.find(o=>o.id==v),null))}}`,
					onFocus: "{{$projectFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.project && data.other.project[_rowIndex].id }}",
						children: '{{data.other.project && data.other.project[_rowIndex].name }}',
						_power: 'for in data.other.project'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addProject}}'
					},
				}]
			}, {
				name: 'personItem',
				component: 'Form.Item',
				required: true,
				validateStatus: 'info',
				label: '业务员',
				children: [{
					name: 'person',
					component: 'Select',
					showSearch: true,
					value: '{{data.form.person && data.form.person.id }}',
					onChange: `{{(v)=>$sf('data.form.person', $fromJS(data.other.person.find(o=>o.id==v),null))}}`,
					onFocus: "{{$personFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.person && data.other.person[_rowIndex].id }}",
						children: '{{data.other.person && data.other.person[_rowIndex].name }}',
						_power: 'for in data.other.person'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addPerson}}'
					},
				}]
			}, {
				name: 'memo',
				component: 'Form.Item',
				label: '备注',
				className: 'app-scm-voucher-card-form-header-memo',
				children: [{
					name: 'memo',
					component: 'Input',
					value: '{{data.form.memo}}',
					onChange: "{{(e)=>$sf('data.form.memo',e.target.value)}}",
				}]
			}]
		}, {
			name: 'details',
			component: 'DataGrid',
			className: 'app-scm-voucher-card-form-details',
			headerHeight: 35,
			rowHeight: 35,
			footerHeight: 35,
			rowsCount: '{{data.form.details.length}}',
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			sequenceFooter: {
				name: 'footer',
				component: 'DataGrid.Cell',
				children: '汇总'
			},
			readonly: false,
			onAddrow: "{{$addRow('details')}}",
			onDelrow: "{{$delRow('details')}}",
			onKeyDown: '{{$gridKeydown}}',
			scrollToColumn: '{{data.other.detailsScrollToColumn}}',
			scrollToRow: '{{data.other.detailsScrollToRow}}',
			columns: [{
				name: 'stockCode',
				component: 'DataGrid.Column',
				columnKey: 'stockCode',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: [{
						name: 'label',
						component: '::label',
						className: 'ant-form-item-required',
						children: '存货编码'
					}]
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: true,
					value: `{{{
								if(!data.form.details[_rowIndex].stock) return
								return $isFocus(_ctrlPath)
									? data.form.details[_rowIndex].stock.id
									: data.form.details[_rowIndex].stock.code
							}}}`,
					onChange: `{{(v)=>{
								const hit = data.other.stocks.find(o=>o.id==v)
								$sf('data.form.details.'+ _rowIndex + '.stock', $fromJS(hit,null))
							}}}`,
					onFocus: "{{$stockFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.stocks && data.other.stocks[_lastIndex].id }}",
						children: '{{data.other.stocks && data.other.stocks[_lastIndex].name }}',
						_power: 'for in data.other.stocks'
					},
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				},
			}, {
				name: 'stockName',
				component: 'DataGrid.Column',
				columnKey: 'stockName',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '存货名称'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex].stock && data.form.details[_rowIndex].stock.name}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'spec',
				component: 'DataGrid.Column',
				columnKey: 'spec',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '规格型号'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex].stock && data.form.details[_rowIndex].stock.spec}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'unit',
				component: 'DataGrid.Column',
				columnKey: 'unit',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '计量单位'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex].stock && data.form.details[_rowIndex].stock.meaUnit && data.form.details[_rowIndex].stock.meaUnit.name}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'isGift',
				component: 'DataGrid.Column',
				columnKey: 'isGift',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '赠品'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{ data.form.details[_rowIndex].isGift ? '是': '否' }}",
					checked: "{{ data.form.details[_rowIndex].isGift }}",
					onChange: "{{(e)=>$sf('data.form.details.' + _rowIndex + '.isGift', e.target.checked)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'number',
				component: 'DataGrid.Column',
				columnKey: 'number',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数量'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-right'}}",
					value: "{{$numberFormat(data.form.details[_rowIndex].number,2,$isFocus(_ctrlPath))}}",
					onChange: "{{$calc(_rowIndex, 'number',data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'price',
				component: 'DataGrid.Column',
				columnKey: 'price',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '单价'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-right'}}",
					value: "{{$numberFormat(data.form.details[_rowIndex].price,2,$isFocus(_ctrlPath))}}",
					onChange: "{{$calc(_rowIndex,'price', data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'amount',
				component: 'DataGrid.Column',
				columnKey: 'amount',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled app-scm-voucher-card-cell-right'}}",
					value: "{{$numberFormat(data.form.details[_rowIndex].amount, 2)}}",
					onChange: "{{$calc(_rowIndex,'amount', data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumAmount(data.form.details)}}'
				}
			}, {
				name: 'taxRate',
				component: 'DataGrid.Column',
				columnKey: 'taxRate',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税率'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: false,
					value: `{{{
								if(!data.form.details[_rowIndex].taxRate) return
								return $isFocus(_ctrlPath)
									? data.form.details[_rowIndex].taxRate.id
									: data.form.details[_rowIndex].taxRate.name
							}}}`,
					onChange: "{{$calc(_rowIndex,'taxRate', data.form.details[_rowIndex], data.other.taxRates)}}",
					onFocus: "{{$taxRateFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.taxRates && data.other.taxRates[_lastIndex].id }}",
						children: '{{data.other.taxRates && data.other.taxRates[_lastIndex].name }}',
						_power: 'for in data.other.taxRates'
					},
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'tax',
				component: 'DataGrid.Column',
				columnKey: 'tax',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税额'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled app-scm-voucher-card-cell-right'}}",
					value: "{{$numberFormat(data.form.details[_rowIndex].tax, 2)}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumTax(data.form.details)}}'
				}
			}, {
				name: 'priceTaxTotal',
				component: 'DataGrid.Column',
				columnKey: 'priceTaxTotal',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '价税合计'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled app-scm-voucher-card-cell-right'}}",
					value: "{{$numberFormat(data.form.details[_rowIndex].priceTaxTotal, 2)}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumPriceTaxTotal(data.form.details)}}'
				}
			}]
		}, {
			name: 'formFooter',
			component: 'Layout',
			className: 'app-scm-voucher-card-form-footer',
			children: [{
				name: 'settlement',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-settlement',
				children: [{
					name: 'settlementModeItem',
					component: 'Form.Item',
					label: '结算方式',
					children: [{
						name: 'settlementMode',
						component: 'Select',
						showSearch: false,
						value: '{{data.form.settlementMode && data.form.settlementMode.id }}',
						onChange: `{{(v)=>$sf('data.form.settlementMode', $fromJS(data.other.settlementModes.find(o=>o.id==v),null))}}`,
						onFocus: "{{$settlementModeFocus}}",
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.settlementModes && data.other.settlementModes[_lastIndex].id }}",
							children: '{{data.other.settlementModes && data.other.settlementModes[_lastIndex].name }}',
							_power: 'for in data.other.settlementModes'
						}
					}]
				}, {
					name: 'accountItem',
					component: 'Form.Item',
					label: '现结账户',
					children: [{
						name: 'account',
						component: 'Select',
						showSearch: false,
						value: '{{data.form.settlements[_rowIndex].account && data.form.settlements[_rowIndex].account.id }}',
						onChange: `{{(v)=>$sf('data.form.settlements.'+ _rowIndex +'.account', $fromJS(data.other.assetAccounts.find(o=>o.id==v),null))}}`,
						onFocus: "{{$accountFocus}}",
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.assetAccounts && data.other.assetAccounts[_lastIndex].id }}",
							children: '{{data.other.assetAccounts && data.other.assetAccounts[_lastIndex].name }}',
							_power: 'for in data.other.assetAccounts'
						}
					}]
				}, {
					name: 'settlementAmount',
					component: 'Form.Item',
					label: '现结金额',
					children: [{
						name: 'settlementAmount',
						component: 'Input.Number',
						value: "{{data.form.settlements[_rowIndex].settlementAmount}}",
						onChange: "{{(v)=>$sf('data.form.settlements.' + _rowIndex + '.settlementAmount', v)}}",
					}]
				}],
				_power: 'for in data.form.settlements'
			}, {
				name: 'advance',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-advance',
				children: [{
					name: 'useItem',
					component: 'Form.Item',
					label: '使用预收款',
					children: [{
						name: 'useAdvance',
						component: 'Checkbox',
						checked: '{{data.form.useAdvance}}',
						onChange: `{{(e)=>$sf('data.form.useAdvance', e.target.checked)}}`,
					}]
				}, {
					name: 'advanceAmountItem',
					component: 'Form.Item',
					label: '预收款',
					children: [{
						name: 'advanceAmount',
						component: 'Input.Number',
						value: '{{data.form.advanceAmount}}',
						onChange: `{{(v)=>$sf('data.form.advanceAmount', v)}}`,
					}]
				}]
			}, {
				name: 'balance',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-balance',
				children: [{
					name: 'balanceItem',
					component: 'Form.Item',
					label: '余额',
					children: [{
						name: 'balanceAdvance',
						component: '::span',
						children: '{{$calcBalance(data)}}'
					}]
				}]
			}]
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'app-scm-voucher-card-footer',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-footer-left',
				children: [{
					name: 'creator',
					component: '::div',
					children: '制单人:张三',
					style: { marginRight: 30 }
				}, {
					name: 'approver',
					component: '::div',
					children: '审核人:李四'
				}]

			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-footer-right',
				children: [{
					name: 'save',
					component: 'Button',
					type: 'showy',
					onClick: '{{$save}}',
					children: '保存'
				}, {
					name: 'saveAndNew',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$saveAndNew}}',
					children: '保存新增'
				}, {
					name: 'cancel',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$cancel}}',
					children: '放弃'
				}]

			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				details: [{}],
				settlements: [{}]
			},
			total: {

			},
			other: {
			}
		}
	}
}