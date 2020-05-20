using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms.Maps;

namespace OxbridgeRaceMobileApp2.ViewModel
{
   public class MapViewModel : BaseViewModel
    {
        public MapViewModel()
        {
            Map = new Map();
        }

        public Map Map { get; private set; }
    }
}
