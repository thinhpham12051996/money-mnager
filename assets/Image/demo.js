<FlatList data={addData} renderItem={({ item, index }) => {
  return (
    <View>
      {
        dateHandler(item, index)
      }
      <View style={styles.dataRecord}>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <View style={[styles.incomeicon]}>
            {
              incomeIconeHandler(item.category.icone)
            }
          </View>
          <Text style={{ color: "#000" }}>{item.category ? item.category.title : ''}</Text>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          {inSelect === "income" ?
            <View style={styles.expenseContaint}>
              <View style={styles.addStyle}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>INC</Text>
              </View>
              <Text style={{ color: "#000" }}>{item.amount}.00</Text>
            </View> :
            <View style={styles.expenseContaint}>
              <View style={styles.expenseStyle}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>EXP</Text>
              </View>
              <Text style={{ color: "#000" }}>{item.amount}.00</Text>
            </View>
            // <Text>-RM {item.amount}.00</Text>
          }
        </View>
      </View>
    </View >

  )
}} />