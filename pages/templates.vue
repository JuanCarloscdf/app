
<template>
  <div style="padding: 20px" >
    <!-- WIDGET CONFIGURATOR -->
   
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Herramientas </h4>
        </div>
        
        <div class="row">
          <!-- WIDGET SELECTOR AND FORMS -->
          <div class="col-6">
            <!-- WIDGETS SELECTOR -->
            <el-select
              v-model="widgetType"
              class="select-success"
              placeholder="Seleccione una herramienta"
              style="width: 100%;"
            >
              <el-option
                class="text-dark"
                value="numberchart"
                label="Grafica de lineas"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="indicator"
                label="Estado de variable INPUT <-"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="mapa"
                label="Map INPUT <-"
              ></el-option>
              <el-option
                class="text-dark"
                value="switch"
                label="Switch OUTPUT ->"
              ></el-option>
              <el-option
                class="text-dark"
                value="button"
                label="Boton OUTPUT ->"
              ></el-option>
              <el-option
                class="text-dark"
                value="chartjs"
                label="ChartJs INPUT ->"
              ></el-option>
              <el-option
                class="text-dark"
                value="actbool"
                label="interlocutor ->"
              ></el-option>

              <el-option
                class="text-dark"
                value="iotbar"
                label="filbar INPUT"
              ></el-option>
              <el-option
                class="text-dark"
                value="iotbarchart"
                label="Grafica de barras"
              ></el-option>
              
            </el-select>

            <br />
            <br />
          
            <!-- FORMS NUMBER CHART TYPE -->
            <div v-if="widgetType == 'numberchart'">
              <base-input
                v-model="ncConfig.variableFullName"
                label="Nombre de la variable"
                type="text"
              >
              </base-input>

              <base-input v-model="ncConfig.unit" label="Unidad" type="text">
              </base-input>

              <base-input
                v-model.number="ncConfig.decimalPlaces"
                label="Numero de decimales"
                type="number"
              >
              </base-input>

              <base-input
                v-model="ncConfig.icon"
                label="Icono"
                type="text"
              ></base-input>

              <br />

              <base-input
                v-model.number="ncConfig.variableSendFreq"
                label="Frecuencia de envio de datos(s)"
                type="number"
              ></base-input>

              <br />

              <base-input
                v-model.number="ncConfig.chartTimeAgo"
                label="Tiempo de observaciòn (min)"
                type="number"
              ></base-input>

              <br />

              <el-select
                v-model="ncConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>

              <br /><br /><br />

              <el-select
                v-model="ncConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
            <!-- BAR CHART TYPE -->
            <div v-if="widgetType == 'iotbarchart'">
              <base-input
                v-model="IotBarChartConfig.variableFullName"
                label="Nombre de la variable"
                type="text"
              >
              </base-input>

              <base-input v-model="IotBarChartConfig.unit" 
              label="Unidad" 
              type="text">
              </base-input>

              <base-input
                v-model.number="IotBarChartConfig.variableSendFreq"
                label="Frecuencia de envio de datos(s)"
                type="number"
              ></base-input>

              <br />

              <!-- <base-input
                v-model.number="IotBarChartConfig.chartTimeAgo"
                label="Tiempo de observaciòn (min)"
                type="number"
              ></base-input> -->
              <el-select
                v-model="IotBarChartConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
            <!-- CHARTJS TYPE -->
            <div v-if="widgetType == 'chartjs'">
              <base-input
                v-model="cjConfig.variableFullName"
                label="Nombre de la variable 1"
                type="text"
              >
              </base-input>
                <base-input v-model="cjConfig.unit" label="Unidad 1" type="text">
              </base-input>
              <base-input
                v-model="cjConfig.variableFullName2"
                label="Nombre de la variable 2"
                type="text"
              >
              </base-input>

            
              <base-input v-model="cjConfig.unit2" label="Unidad 2" type="text">
              </base-input>

              <base-input
                v-model.number="cjConfig.decimalPlaces"
                label="Numero de decimales"
                type="number"
              >
              </base-input>

              <base-input
                v-model="cjConfig.icon"
                label="Icono"
                type="text"
              ></base-input>

              <br />

              <base-input
                v-model.number="cjConfig.variableSendFreq"
                label="Frecuencia de envio de datos(s)"
                type="number"
              ></base-input>

              <br />

              <base-input
                v-model.number="cjConfig.chartTimeAgo"
                label="Tiempo de observaciòn (min)"
                type="number"
              ></base-input>

              <br />

              <el-select
                v-model="cjConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
            <!-- FORM SWITCH TYPE -->
            <div v-if="widgetType == 'switch'">
              <base-input
                v-model="iotSwitchConfig.variableFullName"
                label="Nombre de Variable"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotSwitchConfig.icon"
                label="Icono"
                type="text"
              ></base-input>

              <br />

              <el-select
                v-model="iotSwitchConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>

              <br /><br /><br />

              <el-select
                v-model="iotSwitchConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>

            <!-- FORM BUTTON TYPE -->
            <div v-if="widgetType == 'button'">
              <base-input
                v-model="configButton.variableFullName"
                label="Nombre de variable"
                type="text"
              >
              </base-input>

              <base-input
                v-model="configButton.message"
                label="Mensaje a enviar"
                type="text"
              >
              </base-input>

              <base-input
                v-model="configButton.text"
                label="Texto del boton"
                type="text"
              >
              </base-input>

              <base-input
                v-model="configButton.icon"
                label="Icono"
                type="text"
              ></base-input>

              <br />

              <el-select
                v-model="configButton.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>

              <br /><br /><br />

              <el-select
                v-model="configButton.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>

            <!-- FORM MAP TYPE -->
            <div v-if="widgetType == 'mapa'">
              <base-input
                v-model="iotMap.variableFullName"
                label="Variable"
                type="text"
              >
              </base-input>

               <base-input
                v-model="iotMap.variableSendFreq"
                label="Frecuencia de envio"
                type="text"
              ></base-input>
              <h5>tamaño</h5>
              <el-select
                v-model="iotMap.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />chartjs
            </div>

            <!-- FORM INDICATOR TYPE -->
            <div v-if="widgetType == 'indicator'">

              <base-input
                v-model="iotIndicatorConfig.variableFullName"
                label="Variable"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotIndicatorConfig.icon"
                label="Icono"
                type="text"
              ></base-input>

              <br />

              <base-input
                v-model="iotIndicatorConfig.variableSendFreq"
                label="Frecuencia de envio"
                type="text"
              ></base-input>

              <br />

              <el-select
                v-model="iotIndicatorConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>

              <br /><br /><br />

              <el-select
                v-model="iotIndicatorConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
            <!-- FORM IOTBAR TYPE -->
            <div v-if="widgetType == 'iotbar'">

              <base-input
                v-model="iotBarConfig.variableFullName"
                label="Variable"
                type="text"
              >
              </base-input>
              <base-input
                v-model="iotBarConfig.max"
                label="Valor màximo"
                type="number"
              >
              </base-input>

              <base-input
                v-model="iotBarConfig.unit"
                label="unidad"
                type="text"
              >
              </base-input>

              <br />

              <base-input
                v-model="iotBarConfig.variableSendFreq"
                label="Frecuencia de envio"
                type="text"
              ></base-input>

              <br />

              <el-select
                v-model="iotBarConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="grande"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
            <!-- FORM actbool TYPE -->
            <div v-if="widgetType == 'actbool'">

              <base-input
                v-model="iotActBoolConfig.variableFullName"
                label="Variable"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotActBoolConfig.icon"
                label="Icono"
                type="text"
              ></base-input>

              <base-input
                v-model="iotActBoolConfig.umbral"
                label="umbral y condiciòn"
                type="number"
              ></base-input>
              
              <el-select
                v-model="iotActBoolConfig.condition"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option class="text-dark" value="igual" label="igual"></el-option>
                <el-option class="text-dark" value="mayor" label="mayor "></el-option>
                <el-option class="text-dark" value="mayorigual" label="mayor igual"></el-option>
                <el-option class="text-dark" value="menor" label="menor"></el-option>
                <el-option class="text-dark" value="menorigual" label="menor igual"></el-option>
                <el-option class="text-dark" value="distinto" label="distinto"></el-option>
                
              </el-select>

              <base-input
                v-model="iotActBoolConfig.message"
                label="mensaje"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotActBoolConfig.variableSendFreq"
                label="Frecuencia de envio"
                type="text"
              ></base-input>

              <br />

              <el-select
                v-model="iotActBoolConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>

              <br /><br /><br />

              <el-select
                v-model="iotActBoolConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="pequeño"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="mediano"
                ></el-option>
              </el-select>

              <br /><br />
            </div>
          </div>

          <!-- WIDGET PREVIEW -->
          <div class="col-6" >
            <Rtnumberchart
              v-if="widgetType == 'numberchart'"
              :config="ncConfig"
            ></Rtnumberchart>
            <Iotswitch
              v-if="widgetType == 'switch'"
              :config="iotSwitchConfig"
            ></Iotswitch>
            <Iotbutton
              v-if="widgetType == 'button'"
              :config="configButton"
            ></Iotbutton>
            <Iotindicator
              v-if="widgetType == 'indicator'"
              :config="iotIndicatorConfig"
            ></Iotindicator>
             <Map
              v-if="widgetType == 'mapa'"
              :config="iotMap"
            ></Map>
            <ChartJs
              v-if="widgetType == 'chartjs'"
              :config="cjConfig"
            ></ChartJs>
            <ActBool
              v-if="widgetType == 'actbool'"
              :config="iotActBoolConfig"
            ></ActBool>
            <IotBar
              v-if="widgetType == 'iotbar'"
              :config="iotBarConfig"
            ></IotBar>
            <IotBarChart
              v-if="widgetType == 'iotbarchart'"
              :config="IotBarChartConfig"
            ></IotBarChart>
          </div>
        </div>

        <!-- ADD WIDGET BUTTON -->
        <div class="row pull-right">
          <div class="col-12">
            <base-button
              native-type="submit"
              type="primary-dark-color"
              class="mb-3"
              size="lg"
              @click="addNewWidget()"
            >
              Añadir
            </base-button>
          </div>
        </div>
      </card>
    </div> 

    <!-- DASHBOARD PREVIEW -->
    <div class="row">
      <div
        v-for="(widget, index) in widgets"
        :key="index"
        :class="[widget.column]"
      >
        <i
          aria-hidden="true"
          class="fa fa-trash text-warning pull-right"
          @click="deleteWidget(index)"
          style="margin-bottom: 10px;"
        ></i>

        <Rtnumberchart
          v-if="widget.widget == 'numberchart'"
          :config="widget"
        ></Rtnumberchart>

        <Iotswitch
          v-if="widget.widget == 'switch'"
          :config="widget"
        ></Iotswitch>

        <Iotbutton
          v-if="widget.widget == 'button'"
          :config="widget"
        ></Iotbutton>

        <Iotindicator
          v-if="widget.widget == 'indicator'"
          :config="widget"
        ></Iotindicator>
        <Map
          v-if="widget.widget == 'mapa'"
          :config="widget"
        ></Map>
        <ChartJs
          v-if="widget.widget == 'chartjs'"
          :config="widget"
        ></ChartJs>
        <ActBool
          v-if="widget.widget == 'actbool'"
          :config="widget"
        ></ActBool>
        <IotBar
          v-if="widget.widget == 'iotbar'"
          :config="widget"
        ></IotBar>
        <IotBarChart
          v-if="widget.widget == 'iotbarchart'"
          :config="widget"
        ></IotBarChart>
      </div>
    </div>

    <!-- SAVE TEMPLATE FORM-->
    <div class="row" >
      <card>
        <div slot="header">
          <h4 class="card-title">Guardar plantilla</h4>
        </div>

        <div class="row">
          <base-input
            class="col-4"
            v-model="templateName"
            label="nombre"
            type="text"
          >
          </base-input>

          <base-input
            class="col-8"
            v-model="templateDescription"
            label="descripciòn"
            type="text"
          >
          </base-input>
        </div>

        <br /><br />

        <div class="row">
          <div class="col-12">
            <base-button
              native-type="submit"
              type="primary-dark-color"
              class="mb-3 pull-right"
              size="lg"
              @click="saveTemplate()"
              :disabled="widgets.length == 0"
            >
              Guardar
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- TEMPLATES TABLE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Plantillas creadas</h4>
        </div>

        <div class="row">
          <el-table :data="templates">
            <el-table-column min-width="50" label="#" align="center" >
              <div class="photo" slot-scope="{ row, $index }">
                {{ $index + 1 }}
              </div>
            </el-table-column>

            <el-table-column prop="name" label="Nombre" width="120"></el-table-column>

            <el-table-column
              prop="description"
              label="Descripciòn"
              
            ></el-table-column>

            <el-table-column
              prop="widgets.length"
              label="herramientas"
              align="center"
   
            ></el-table-column>
            <el-table-column prop="createdTime" label="fecha de creacion"  >
              <div slot-scope="{ row, $index }">
                     {{unixToDate(row.createdTime)}}
              </div>
           
                
            </el-table-column>

            <el-table-column header-align="right" align="right" label="eliminar" >
              <div
                slot-scope="{ row, $index }"
                class="text-right table-actions"
              >
                <el-tooltip
                  content="Delete"
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-button
                    @click="deleteTemplate(row)"
                    type="danger"
                    icon
                    size="sm"
                    class="btn-link"
                  >
                    <i class="tim-icons icon-simple-remove "></i>
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>

    <!-- <Json :value="widgets"></Json >   -->  
  </div>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";
export default {
  components: { LineChart },
  middleware: "authenticated",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      widgets: [],
      templates: [],
      widgetType: "",
      templateName: "",
      templateDescription: "",
      ncConfig: {
        userId: "sampleuserid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "temperatura",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "10",
        unit: "ºC",
        class: "success",
        column: "col-6",
        decimalPlaces: 2,
        widget: "numberchart",
        icon: "fa-thermometer",
        chartTimeAgo: 12000,
        demo: true
      },
      /* bar chart */
      IotBarChartConfig: {
        userId: "sampleuserid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "temperatura",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "25",
        column: "col-6",
        widget: "iotbarchart",
        chartTimeAgo: 60,
        demo: true
      },
      /* chart js */
      cjConfig: {
        userId: "sampleuserid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "temperatura",
        variableFullName2: "humedad",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "15",
        unit: "ºC",
        unit2: "%",
        class: "success",
        column: "col-12",
        decimalPlaces: 2,
        widget: "chartjs",
        icon: "fa-home",
        chartTimeAgo: 12000,
        demo: true
      },
      /* switch */
      iotSwitchConfig: {
        userId: "userid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "Luz",
        variable: "varname",
        variableType: "output",
        class: "danger",
        widget: "switch",
        icon: "fa-door-open",
        column: "col-3"
      },
      /* indicator */
      iotIndicatorConfig: {
        userId: "userid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "foco",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "10",
        class: "success",
        widget: "indicator",
        icon: "fa-lightbulb",
        column: "col-6"
      },
      /* iotbar */
      iotBarConfig: {
        userId: "userid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888"
        },
        variableFullName: "Aula 305",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "10",
        max:130,
        unit:"Alumnos",
        widget: "iotbar",
        column: "col-6"
      },
      /* actbool */
      iotActBoolConfig: {
        userId: "userid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "serie"
        },
        variableFullName: "temperatura",
        message:"mensaje para el dispositivo",
        variable: "varname",
        umbral:"valor umbral",
        condition:"condicion",
        variableType: "inputoutput",
        variableSendFreq: "8",
        class: "success",
        widget: "actbool",
        icon: "fa-car",
        column: "col-6"
      },
      /* buttom */
      configButton: {
        userId: "userid",
        selectedDevice: {
          name: "ID de dispositivo",
          dId: "8888",
          templateName: "Power Sensor",
          templateId: "984237562348756ldksjfh",
          saverRule: false
        },
        variableFullName: "Foco Sala",
        variable: "var1",
        variableType: "output",
        icon: "fa-lightbulb",
        column: "col-3",
        widget: "button",
        class: "danger",
        message: "string"
      },
      iotMap: {
        userId: "userid",
        selectedDevice: {
          name: "dId - dispositivo",
          dId: "8888",
        },
        variableFullName: "ubicacissssón",
        variable: "var1",
        variableType: "input",
        variableSendFreq:"20",
        class:"primary",
        icon: "fa-sun",
        column: "col-6",
        widget: "mapa",
        demo: true 
      },
    };
  },
  mounted() {
    this.getTemplates();
  },
  methods: {
    //Get Templates
    async getTemplates() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      try {
        const res = await this.$axios.get("/template", axiosHeaders);
        console.log(res.data);
        if (res.data.status == "success") {
          this.templates = res.data.data;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error obteniendo plantilla..."
        });
        console.log(error);
        return;
      }
    },
    //Save Template
    async saveTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      console.log(axiosHeaders);
      const toSend = {
        template: {
          name: this.templateName,
          description: this.templateDescription,
          widgets: this.widgets
        }
      };
      try {
        const res = await this.$axios.post("/template", toSend, axiosHeaders);
        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Plantilla creada correctamente!"
          });
          this.getTemplates();
          this.widgets = [];
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error creando plantilla..."
        });
        console.log(error);
        return;
      }
    },
    //Delete Template
    async deleteTemplate(template) {
      
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params:{
          templateId:template._id
        }
      };
      console.log(axiosHeaders);
      try {
        const res = await this.$axios.delete("/template", axiosHeaders);
        console.log(res.data)
        if (res.data.status == "fail" && res.data.error == "template in use") {
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: template.name + " esta en uso. primero borre los dispositivos asociados!"
          });
          
          return;
        }
        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: template.name + " fue eliminado!"
          });
          
          this.getTemplates();
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },
    //Add Widget
    addNewWidget() {
      if (this.widgetType == "numberchart") {
        this.ncConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.ncConfig)));
      }
      if (this.widgetType == "switch") {
        this.iotSwitchConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotSwitchConfig)));
      }
      if (this.widgetType == "button") {
        this.configButton.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.configButton)));
      }
      if (this.widgetType == "indicator") {
        this.iotIndicatorConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotIndicatorConfig)));
      }
      if (this.widgetType == "mapa") {
        this.iotMap.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotMap)));
      }
      if (this.widgetType == "chartjs") {
        this.cjConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.cjConfig)));
      }
      if (this.widgetType == "actbool") {
        this.iotActBoolConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotActBoolConfig)));
      }
      if (this.widgetType == "iotbar") {
        this.iotBarConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotBarConfig)));
      }
      if (this.widgetType == "iotbarchart") {
        this.IotBarChartConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.IotBarChartConfig)));
      }
    },
    //Delete Widget
    deleteWidget(index) {
      this.widgets.splice(index, 1);
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
        unixToDate(ms) {
        var d = new Date(parseInt(ms)), 
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
          ampm = 'AM',
          time;

        if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
        } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
        } else if (hh == 0) {
          h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time = dd + '/' + mm + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;

        return time;
      },
  }

};
</script>
