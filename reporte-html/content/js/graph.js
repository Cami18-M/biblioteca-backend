/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 123.0, "minX": 0.0, "maxY": 2234.0, "series": [{"data": [[0.0, 123.0], [0.1, 123.0], [0.2, 123.0], [0.3, 123.0], [0.4, 123.0], [0.5, 123.0], [0.6, 123.0], [0.7, 123.0], [0.8, 123.0], [0.9, 123.0], [1.0, 124.0], [1.1, 124.0], [1.2, 124.0], [1.3, 124.0], [1.4, 124.0], [1.5, 124.0], [1.6, 124.0], [1.7, 124.0], [1.8, 124.0], [1.9, 124.0], [2.0, 125.0], [2.1, 125.0], [2.2, 125.0], [2.3, 125.0], [2.4, 125.0], [2.5, 125.0], [2.6, 125.0], [2.7, 125.0], [2.8, 125.0], [2.9, 125.0], [3.0, 126.0], [3.1, 126.0], [3.2, 126.0], [3.3, 126.0], [3.4, 126.0], [3.5, 126.0], [3.6, 126.0], [3.7, 126.0], [3.8, 126.0], [3.9, 126.0], [4.0, 129.0], [4.1, 129.0], [4.2, 129.0], [4.3, 129.0], [4.4, 129.0], [4.5, 129.0], [4.6, 129.0], [4.7, 129.0], [4.8, 129.0], [4.9, 129.0], [5.0, 132.0], [5.1, 132.0], [5.2, 132.0], [5.3, 132.0], [5.4, 132.0], [5.5, 132.0], [5.6, 132.0], [5.7, 132.0], [5.8, 132.0], [5.9, 132.0], [6.0, 133.0], [6.1, 133.0], [6.2, 133.0], [6.3, 133.0], [6.4, 133.0], [6.5, 133.0], [6.6, 133.0], [6.7, 133.0], [6.8, 133.0], [6.9, 133.0], [7.0, 135.0], [7.1, 135.0], [7.2, 135.0], [7.3, 135.0], [7.4, 135.0], [7.5, 135.0], [7.6, 135.0], [7.7, 135.0], [7.8, 135.0], [7.9, 135.0], [8.0, 135.0], [8.1, 135.0], [8.2, 135.0], [8.3, 135.0], [8.4, 135.0], [8.5, 135.0], [8.6, 135.0], [8.7, 135.0], [8.8, 135.0], [8.9, 135.0], [9.0, 135.0], [9.1, 135.0], [9.2, 135.0], [9.3, 135.0], [9.4, 135.0], [9.5, 135.0], [9.6, 135.0], [9.7, 135.0], [9.8, 135.0], [9.9, 135.0], [10.0, 135.0], [10.1, 135.0], [10.2, 135.0], [10.3, 135.0], [10.4, 135.0], [10.5, 135.0], [10.6, 135.0], [10.7, 135.0], [10.8, 135.0], [10.9, 135.0], [11.0, 137.0], [11.1, 137.0], [11.2, 137.0], [11.3, 137.0], [11.4, 137.0], [11.5, 137.0], [11.6, 137.0], [11.7, 137.0], [11.8, 137.0], [11.9, 137.0], [12.0, 138.0], [12.1, 138.0], [12.2, 138.0], [12.3, 138.0], [12.4, 138.0], [12.5, 138.0], [12.6, 138.0], [12.7, 138.0], [12.8, 138.0], [12.9, 138.0], [13.0, 139.0], [13.1, 139.0], [13.2, 139.0], [13.3, 139.0], [13.4, 139.0], [13.5, 139.0], [13.6, 139.0], [13.7, 139.0], [13.8, 139.0], [13.9, 139.0], [14.0, 139.0], [14.1, 139.0], [14.2, 139.0], [14.3, 139.0], [14.4, 139.0], [14.5, 139.0], [14.6, 139.0], [14.7, 139.0], [14.8, 139.0], [14.9, 139.0], [15.0, 140.0], [15.1, 140.0], [15.2, 140.0], [15.3, 140.0], [15.4, 140.0], [15.5, 140.0], [15.6, 140.0], [15.7, 140.0], [15.8, 140.0], [15.9, 140.0], [16.0, 142.0], [16.1, 142.0], [16.2, 142.0], [16.3, 142.0], [16.4, 142.0], [16.5, 142.0], [16.6, 142.0], [16.7, 142.0], [16.8, 142.0], [16.9, 142.0], [17.0, 142.0], [17.1, 142.0], [17.2, 142.0], [17.3, 142.0], [17.4, 142.0], [17.5, 142.0], [17.6, 142.0], [17.7, 142.0], [17.8, 142.0], [17.9, 142.0], [18.0, 145.0], [18.1, 145.0], [18.2, 145.0], [18.3, 145.0], [18.4, 145.0], [18.5, 145.0], [18.6, 145.0], [18.7, 145.0], [18.8, 145.0], [18.9, 145.0], [19.0, 147.0], [19.1, 147.0], [19.2, 147.0], [19.3, 147.0], [19.4, 147.0], [19.5, 147.0], [19.6, 147.0], [19.7, 147.0], [19.8, 147.0], [19.9, 147.0], [20.0, 148.0], [20.1, 148.0], [20.2, 148.0], [20.3, 148.0], [20.4, 148.0], [20.5, 148.0], [20.6, 148.0], [20.7, 148.0], [20.8, 148.0], [20.9, 148.0], [21.0, 149.0], [21.1, 149.0], [21.2, 149.0], [21.3, 149.0], [21.4, 149.0], [21.5, 149.0], [21.6, 149.0], [21.7, 149.0], [21.8, 149.0], [21.9, 149.0], [22.0, 150.0], [22.1, 150.0], [22.2, 150.0], [22.3, 150.0], [22.4, 150.0], [22.5, 150.0], [22.6, 150.0], [22.7, 150.0], [22.8, 150.0], [22.9, 150.0], [23.0, 152.0], [23.1, 152.0], [23.2, 152.0], [23.3, 152.0], [23.4, 152.0], [23.5, 152.0], [23.6, 152.0], [23.7, 152.0], [23.8, 152.0], [23.9, 152.0], [24.0, 152.0], [24.1, 152.0], [24.2, 152.0], [24.3, 152.0], [24.4, 152.0], [24.5, 152.0], [24.6, 152.0], [24.7, 152.0], [24.8, 152.0], [24.9, 152.0], [25.0, 154.0], [25.1, 154.0], [25.2, 154.0], [25.3, 154.0], [25.4, 154.0], [25.5, 154.0], [25.6, 154.0], [25.7, 154.0], [25.8, 154.0], [25.9, 154.0], [26.0, 155.0], [26.1, 155.0], [26.2, 155.0], [26.3, 155.0], [26.4, 155.0], [26.5, 155.0], [26.6, 155.0], [26.7, 155.0], [26.8, 155.0], [26.9, 155.0], [27.0, 155.0], [27.1, 155.0], [27.2, 155.0], [27.3, 155.0], [27.4, 155.0], [27.5, 155.0], [27.6, 155.0], [27.7, 155.0], [27.8, 155.0], [27.9, 155.0], [28.0, 156.0], [28.1, 156.0], [28.2, 156.0], [28.3, 156.0], [28.4, 156.0], [28.5, 156.0], [28.6, 156.0], [28.7, 156.0], [28.8, 156.0], [28.9, 156.0], [29.0, 158.0], [29.1, 158.0], [29.2, 158.0], [29.3, 158.0], [29.4, 158.0], [29.5, 158.0], [29.6, 158.0], [29.7, 158.0], [29.8, 158.0], [29.9, 158.0], [30.0, 161.0], [30.1, 161.0], [30.2, 161.0], [30.3, 161.0], [30.4, 161.0], [30.5, 161.0], [30.6, 161.0], [30.7, 161.0], [30.8, 161.0], [30.9, 161.0], [31.0, 164.0], [31.1, 164.0], [31.2, 164.0], [31.3, 164.0], [31.4, 164.0], [31.5, 164.0], [31.6, 164.0], [31.7, 164.0], [31.8, 164.0], [31.9, 164.0], [32.0, 168.0], [32.1, 168.0], [32.2, 168.0], [32.3, 168.0], [32.4, 168.0], [32.5, 168.0], [32.6, 168.0], [32.7, 168.0], [32.8, 168.0], [32.9, 168.0], [33.0, 179.0], [33.1, 179.0], [33.2, 179.0], [33.3, 179.0], [33.4, 179.0], [33.5, 179.0], [33.6, 179.0], [33.7, 179.0], [33.8, 179.0], [33.9, 179.0], [34.0, 179.0], [34.1, 179.0], [34.2, 179.0], [34.3, 179.0], [34.4, 179.0], [34.5, 179.0], [34.6, 179.0], [34.7, 179.0], [34.8, 179.0], [34.9, 179.0], [35.0, 183.0], [35.1, 183.0], [35.2, 183.0], [35.3, 183.0], [35.4, 183.0], [35.5, 183.0], [35.6, 183.0], [35.7, 183.0], [35.8, 183.0], [35.9, 183.0], [36.0, 184.0], [36.1, 184.0], [36.2, 184.0], [36.3, 184.0], [36.4, 184.0], [36.5, 184.0], [36.6, 184.0], [36.7, 184.0], [36.8, 184.0], [36.9, 184.0], [37.0, 184.0], [37.1, 184.0], [37.2, 184.0], [37.3, 184.0], [37.4, 184.0], [37.5, 184.0], [37.6, 184.0], [37.7, 184.0], [37.8, 184.0], [37.9, 184.0], [38.0, 185.0], [38.1, 185.0], [38.2, 185.0], [38.3, 185.0], [38.4, 185.0], [38.5, 185.0], [38.6, 185.0], [38.7, 185.0], [38.8, 185.0], [38.9, 185.0], [39.0, 189.0], [39.1, 189.0], [39.2, 189.0], [39.3, 189.0], [39.4, 189.0], [39.5, 189.0], [39.6, 189.0], [39.7, 189.0], [39.8, 189.0], [39.9, 189.0], [40.0, 191.0], [40.1, 191.0], [40.2, 191.0], [40.3, 191.0], [40.4, 191.0], [40.5, 191.0], [40.6, 191.0], [40.7, 191.0], [40.8, 191.0], [40.9, 191.0], [41.0, 194.0], [41.1, 194.0], [41.2, 194.0], [41.3, 194.0], [41.4, 194.0], [41.5, 194.0], [41.6, 194.0], [41.7, 194.0], [41.8, 194.0], [41.9, 194.0], [42.0, 201.0], [42.1, 201.0], [42.2, 201.0], [42.3, 201.0], [42.4, 201.0], [42.5, 201.0], [42.6, 201.0], [42.7, 201.0], [42.8, 201.0], [42.9, 201.0], [43.0, 203.0], [43.1, 203.0], [43.2, 203.0], [43.3, 203.0], [43.4, 203.0], [43.5, 203.0], [43.6, 203.0], [43.7, 203.0], [43.8, 203.0], [43.9, 203.0], [44.0, 203.0], [44.1, 203.0], [44.2, 203.0], [44.3, 203.0], [44.4, 203.0], [44.5, 203.0], [44.6, 203.0], [44.7, 203.0], [44.8, 203.0], [44.9, 203.0], [45.0, 210.0], [45.1, 210.0], [45.2, 210.0], [45.3, 210.0], [45.4, 210.0], [45.5, 210.0], [45.6, 210.0], [45.7, 210.0], [45.8, 210.0], [45.9, 210.0], [46.0, 212.0], [46.1, 212.0], [46.2, 212.0], [46.3, 212.0], [46.4, 212.0], [46.5, 212.0], [46.6, 212.0], [46.7, 212.0], [46.8, 212.0], [46.9, 212.0], [47.0, 214.0], [47.1, 214.0], [47.2, 214.0], [47.3, 214.0], [47.4, 214.0], [47.5, 214.0], [47.6, 214.0], [47.7, 214.0], [47.8, 214.0], [47.9, 214.0], [48.0, 221.0], [48.1, 221.0], [48.2, 221.0], [48.3, 221.0], [48.4, 221.0], [48.5, 221.0], [48.6, 221.0], [48.7, 221.0], [48.8, 221.0], [48.9, 221.0], [49.0, 232.0], [49.1, 232.0], [49.2, 232.0], [49.3, 232.0], [49.4, 232.0], [49.5, 232.0], [49.6, 232.0], [49.7, 232.0], [49.8, 232.0], [49.9, 232.0], [50.0, 238.0], [50.1, 238.0], [50.2, 238.0], [50.3, 238.0], [50.4, 238.0], [50.5, 238.0], [50.6, 238.0], [50.7, 238.0], [50.8, 238.0], [50.9, 238.0], [51.0, 245.0], [51.1, 245.0], [51.2, 245.0], [51.3, 245.0], [51.4, 245.0], [51.5, 245.0], [51.6, 245.0], [51.7, 245.0], [51.8, 245.0], [51.9, 245.0], [52.0, 246.0], [52.1, 246.0], [52.2, 246.0], [52.3, 246.0], [52.4, 246.0], [52.5, 246.0], [52.6, 246.0], [52.7, 246.0], [52.8, 246.0], [52.9, 246.0], [53.0, 246.0], [53.1, 246.0], [53.2, 246.0], [53.3, 246.0], [53.4, 246.0], [53.5, 246.0], [53.6, 246.0], [53.7, 246.0], [53.8, 246.0], [53.9, 246.0], [54.0, 249.0], [54.1, 249.0], [54.2, 249.0], [54.3, 249.0], [54.4, 249.0], [54.5, 249.0], [54.6, 249.0], [54.7, 249.0], [54.8, 249.0], [54.9, 249.0], [55.0, 251.0], [55.1, 251.0], [55.2, 251.0], [55.3, 251.0], [55.4, 251.0], [55.5, 251.0], [55.6, 251.0], [55.7, 251.0], [55.8, 251.0], [55.9, 251.0], [56.0, 262.0], [56.1, 262.0], [56.2, 262.0], [56.3, 262.0], [56.4, 262.0], [56.5, 262.0], [56.6, 262.0], [56.7, 262.0], [56.8, 262.0], [56.9, 262.0], [57.0, 262.0], [57.1, 262.0], [57.2, 262.0], [57.3, 262.0], [57.4, 262.0], [57.5, 262.0], [57.6, 262.0], [57.7, 262.0], [57.8, 262.0], [57.9, 262.0], [58.0, 277.0], [58.1, 277.0], [58.2, 277.0], [58.3, 277.0], [58.4, 277.0], [58.5, 277.0], [58.6, 277.0], [58.7, 277.0], [58.8, 277.0], [58.9, 277.0], [59.0, 278.0], [59.1, 278.0], [59.2, 278.0], [59.3, 278.0], [59.4, 278.0], [59.5, 278.0], [59.6, 278.0], [59.7, 278.0], [59.8, 278.0], [59.9, 278.0], [60.0, 278.0], [60.1, 278.0], [60.2, 278.0], [60.3, 278.0], [60.4, 278.0], [60.5, 278.0], [60.6, 278.0], [60.7, 278.0], [60.8, 278.0], [60.9, 278.0], [61.0, 279.0], [61.1, 279.0], [61.2, 279.0], [61.3, 279.0], [61.4, 279.0], [61.5, 279.0], [61.6, 279.0], [61.7, 279.0], [61.8, 279.0], [61.9, 279.0], [62.0, 279.0], [62.1, 279.0], [62.2, 279.0], [62.3, 279.0], [62.4, 279.0], [62.5, 279.0], [62.6, 279.0], [62.7, 279.0], [62.8, 279.0], [62.9, 279.0], [63.0, 280.0], [63.1, 280.0], [63.2, 280.0], [63.3, 280.0], [63.4, 280.0], [63.5, 280.0], [63.6, 280.0], [63.7, 280.0], [63.8, 280.0], [63.9, 280.0], [64.0, 282.0], [64.1, 282.0], [64.2, 282.0], [64.3, 282.0], [64.4, 282.0], [64.5, 282.0], [64.6, 282.0], [64.7, 282.0], [64.8, 282.0], [64.9, 282.0], [65.0, 282.0], [65.1, 282.0], [65.2, 282.0], [65.3, 282.0], [65.4, 282.0], [65.5, 282.0], [65.6, 282.0], [65.7, 282.0], [65.8, 282.0], [65.9, 282.0], [66.0, 285.0], [66.1, 285.0], [66.2, 285.0], [66.3, 285.0], [66.4, 285.0], [66.5, 285.0], [66.6, 285.0], [66.7, 285.0], [66.8, 285.0], [66.9, 285.0], [67.0, 287.0], [67.1, 287.0], [67.2, 287.0], [67.3, 287.0], [67.4, 287.0], [67.5, 287.0], [67.6, 287.0], [67.7, 287.0], [67.8, 287.0], [67.9, 287.0], [68.0, 299.0], [68.1, 299.0], [68.2, 299.0], [68.3, 299.0], [68.4, 299.0], [68.5, 299.0], [68.6, 299.0], [68.7, 299.0], [68.8, 299.0], [68.9, 299.0], [69.0, 315.0], [69.1, 315.0], [69.2, 315.0], [69.3, 315.0], [69.4, 315.0], [69.5, 315.0], [69.6, 315.0], [69.7, 315.0], [69.8, 315.0], [69.9, 315.0], [70.0, 326.0], [70.1, 326.0], [70.2, 326.0], [70.3, 326.0], [70.4, 326.0], [70.5, 326.0], [70.6, 326.0], [70.7, 326.0], [70.8, 326.0], [70.9, 326.0], [71.0, 347.0], [71.1, 347.0], [71.2, 347.0], [71.3, 347.0], [71.4, 347.0], [71.5, 347.0], [71.6, 347.0], [71.7, 347.0], [71.8, 347.0], [71.9, 347.0], [72.0, 399.0], [72.1, 399.0], [72.2, 399.0], [72.3, 399.0], [72.4, 399.0], [72.5, 399.0], [72.6, 399.0], [72.7, 399.0], [72.8, 399.0], [72.9, 399.0], [73.0, 428.0], [73.1, 428.0], [73.2, 428.0], [73.3, 428.0], [73.4, 428.0], [73.5, 428.0], [73.6, 428.0], [73.7, 428.0], [73.8, 428.0], [73.9, 428.0], [74.0, 434.0], [74.1, 434.0], [74.2, 434.0], [74.3, 434.0], [74.4, 434.0], [74.5, 434.0], [74.6, 434.0], [74.7, 434.0], [74.8, 434.0], [74.9, 434.0], [75.0, 455.0], [75.1, 455.0], [75.2, 455.0], [75.3, 455.0], [75.4, 455.0], [75.5, 455.0], [75.6, 455.0], [75.7, 455.0], [75.8, 455.0], [75.9, 455.0], [76.0, 457.0], [76.1, 457.0], [76.2, 457.0], [76.3, 457.0], [76.4, 457.0], [76.5, 457.0], [76.6, 457.0], [76.7, 457.0], [76.8, 457.0], [76.9, 457.0], [77.0, 458.0], [77.1, 458.0], [77.2, 458.0], [77.3, 458.0], [77.4, 458.0], [77.5, 458.0], [77.6, 458.0], [77.7, 458.0], [77.8, 458.0], [77.9, 458.0], [78.0, 459.0], [78.1, 459.0], [78.2, 459.0], [78.3, 459.0], [78.4, 459.0], [78.5, 459.0], [78.6, 459.0], [78.7, 459.0], [78.8, 459.0], [78.9, 459.0], [79.0, 477.0], [79.1, 477.0], [79.2, 477.0], [79.3, 477.0], [79.4, 477.0], [79.5, 477.0], [79.6, 477.0], [79.7, 477.0], [79.8, 477.0], [79.9, 477.0], [80.0, 480.0], [80.1, 480.0], [80.2, 480.0], [80.3, 480.0], [80.4, 480.0], [80.5, 480.0], [80.6, 480.0], [80.7, 480.0], [80.8, 480.0], [80.9, 480.0], [81.0, 506.0], [81.1, 506.0], [81.2, 506.0], [81.3, 506.0], [81.4, 506.0], [81.5, 506.0], [81.6, 506.0], [81.7, 506.0], [81.8, 506.0], [81.9, 506.0], [82.0, 520.0], [82.1, 520.0], [82.2, 520.0], [82.3, 520.0], [82.4, 520.0], [82.5, 520.0], [82.6, 520.0], [82.7, 520.0], [82.8, 520.0], [82.9, 520.0], [83.0, 548.0], [83.1, 548.0], [83.2, 548.0], [83.3, 548.0], [83.4, 548.0], [83.5, 548.0], [83.6, 548.0], [83.7, 548.0], [83.8, 548.0], [83.9, 548.0], [84.0, 548.0], [84.1, 548.0], [84.2, 548.0], [84.3, 548.0], [84.4, 548.0], [84.5, 548.0], [84.6, 548.0], [84.7, 548.0], [84.8, 548.0], [84.9, 548.0], [85.0, 568.0], [85.1, 568.0], [85.2, 568.0], [85.3, 568.0], [85.4, 568.0], [85.5, 568.0], [85.6, 568.0], [85.7, 568.0], [85.8, 568.0], [85.9, 568.0], [86.0, 621.0], [86.1, 621.0], [86.2, 621.0], [86.3, 621.0], [86.4, 621.0], [86.5, 621.0], [86.6, 621.0], [86.7, 621.0], [86.8, 621.0], [86.9, 621.0], [87.0, 693.0], [87.1, 693.0], [87.2, 693.0], [87.3, 693.0], [87.4, 693.0], [87.5, 693.0], [87.6, 693.0], [87.7, 693.0], [87.8, 693.0], [87.9, 693.0], [88.0, 718.0], [88.1, 718.0], [88.2, 718.0], [88.3, 718.0], [88.4, 718.0], [88.5, 718.0], [88.6, 718.0], [88.7, 718.0], [88.8, 718.0], [88.9, 718.0], [89.0, 806.0], [89.1, 806.0], [89.2, 806.0], [89.3, 806.0], [89.4, 806.0], [89.5, 806.0], [89.6, 806.0], [89.7, 806.0], [89.8, 806.0], [89.9, 806.0], [90.0, 912.0], [90.1, 912.0], [90.2, 912.0], [90.3, 912.0], [90.4, 912.0], [90.5, 912.0], [90.6, 912.0], [90.7, 912.0], [90.8, 912.0], [90.9, 912.0], [91.0, 1159.0], [91.1, 1159.0], [91.2, 1159.0], [91.3, 1159.0], [91.4, 1159.0], [91.5, 1159.0], [91.6, 1159.0], [91.7, 1159.0], [91.8, 1159.0], [91.9, 1159.0], [92.0, 1200.0], [92.1, 1200.0], [92.2, 1200.0], [92.3, 1200.0], [92.4, 1200.0], [92.5, 1200.0], [92.6, 1200.0], [92.7, 1200.0], [92.8, 1200.0], [92.9, 1200.0], [93.0, 1247.0], [93.1, 1247.0], [93.2, 1247.0], [93.3, 1247.0], [93.4, 1247.0], [93.5, 1247.0], [93.6, 1247.0], [93.7, 1247.0], [93.8, 1247.0], [93.9, 1247.0], [94.0, 1392.0], [94.1, 1392.0], [94.2, 1392.0], [94.3, 1392.0], [94.4, 1392.0], [94.5, 1392.0], [94.6, 1392.0], [94.7, 1392.0], [94.8, 1392.0], [94.9, 1392.0], [95.0, 1539.0], [95.1, 1539.0], [95.2, 1539.0], [95.3, 1539.0], [95.4, 1539.0], [95.5, 1539.0], [95.6, 1539.0], [95.7, 1539.0], [95.8, 1539.0], [95.9, 1539.0], [96.0, 1889.0], [96.1, 1889.0], [96.2, 1889.0], [96.3, 1889.0], [96.4, 1889.0], [96.5, 1889.0], [96.6, 1889.0], [96.7, 1889.0], [96.8, 1889.0], [96.9, 1889.0], [97.0, 1893.0], [97.1, 1893.0], [97.2, 1893.0], [97.3, 1893.0], [97.4, 1893.0], [97.5, 1893.0], [97.6, 1893.0], [97.7, 1893.0], [97.8, 1893.0], [97.9, 1893.0], [98.0, 1997.0], [98.1, 1997.0], [98.2, 1997.0], [98.3, 1997.0], [98.4, 1997.0], [98.5, 1997.0], [98.6, 1997.0], [98.7, 1997.0], [98.8, 1997.0], [98.9, 1997.0], [99.0, 2234.0], [99.1, 2234.0], [99.2, 2234.0], [99.3, 2234.0], [99.4, 2234.0], [99.5, 2234.0], [99.6, 2234.0], [99.7, 2234.0], [99.8, 2234.0], [99.9, 2234.0]], "isOverall": false, "label": "GET /api/books", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 42.0, "series": [{"data": [[2200.0, 1.0], [600.0, 2.0], [700.0, 1.0], [800.0, 1.0], [200.0, 27.0], [900.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [300.0, 4.0], [1300.0, 1.0], [1500.0, 1.0], [400.0, 8.0], [100.0, 42.0], [1800.0, 2.0], [1900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "GET /api/books", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 81.0, "series": [{"data": [[0.0, 81.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 10.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 9.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 6.933333333333332, "minX": 1.79306946E12, "maxY": 7.894117647058821, "series": [{"data": [[1.79306952E12, 7.894117647058821], [1.79306946E12, 6.933333333333332]], "isOverall": false, "label": "Carga Constante - Libros y Auth", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79306952E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 152.16666666666669, "minX": 1.0, "maxY": 788.5, "series": [{"data": [[8.0, 378.1052631578948], [4.0, 155.0], [2.0, 346.0], [1.0, 214.0], [9.0, 522.6153846153846], [5.0, 788.5], [10.0, 293.08823529411757], [6.0, 628.0], [3.0, 152.16666666666669], [7.0, 454.6363636363636]], "isOverall": false, "label": "GET /api/books", "isController": false}, {"data": [[7.75, 392.16999999999996]], "isOverall": false, "label": "GET /api/books-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 1.79306946E12, "maxY": 2263.8333333333335, "series": [{"data": [[1.79306952E12, 2263.8333333333335], [1.79306946E12, 399.5]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79306952E12, 0.0], [1.79306946E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79306952E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 295.9411764705884, "minX": 1.79306946E12, "maxY": 937.4666666666668, "series": [{"data": [[1.79306952E12, 295.9411764705884], [1.79306946E12, 937.4666666666668]], "isOverall": false, "label": "GET /api/books", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79306952E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 295.91764705882343, "minX": 1.79306946E12, "maxY": 937.3333333333333, "series": [{"data": [[1.79306952E12, 295.91764705882343], [1.79306946E12, 937.3333333333333]], "isOverall": false, "label": "GET /api/books", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79306952E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.79306946E12, "maxY": 4.9E-324, "series": [{"data": [[1.79306952E12, 0.0], [1.79306946E12, 0.0]], "isOverall": false, "label": "GET /api/books", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79306952E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 123.0, "minX": 1.79306946E12, "maxY": 912.0, "series": [{"data": [[1.79306952E12, 912.0], [1.79306946E12, 806.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79306952E12, 457.8], [1.79306946E12, 797.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79306952E12, 912.0], [1.79306946E12, 806.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79306952E12, 518.5999999999999], [1.79306946E12, 806.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79306952E12, 123.0], [1.79306946E12, 299.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79306952E12, 191.0], [1.79306946E12, 514.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79306952E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 142.0, "minX": 2.0, "maxY": 1893.0, "series": [{"data": [[2.0, 248.5], [19.0, 142.0], [42.0, 188.0], [11.0, 514.0], [22.0, 283.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 1714.0], [42.0, 1203.0], [11.0, 1893.0], [22.0, 1694.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 142.0, "minX": 2.0, "maxY": 1893.0, "series": [{"data": [[2.0, 248.5], [19.0, 142.0], [42.0, 188.0], [11.0, 514.0], [22.0, 283.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 1714.0], [42.0, 1203.0], [11.0, 1893.0], [22.0, 1694.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.38333333333333336, "minX": 1.79306946E12, "maxY": 1.2833333333333334, "series": [{"data": [[1.79306952E12, 1.2833333333333334], [1.79306946E12, 0.38333333333333336]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79306952E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.25, "minX": 1.79306946E12, "maxY": 1.4166666666666667, "series": [{"data": [[1.79306952E12, 1.4166666666666667], [1.79306946E12, 0.25]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79306952E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.79306946E12, "maxY": 1.35, "series": [{"data": [[1.79306952E12, 1.35], [1.79306946E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/books-success", "isController": false}, {"data": [[1.79306952E12, 0.06666666666666667], [1.79306946E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/books-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79306952E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.79306946E12, "maxY": 1.35, "series": [{"data": [[1.79306952E12, 1.35], [1.79306946E12, 0.16666666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.79306952E12, 0.06666666666666667], [1.79306946E12, 0.08333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79306952E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

