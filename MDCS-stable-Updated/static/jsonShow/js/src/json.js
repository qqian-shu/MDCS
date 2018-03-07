var json = {
    "Elements": {
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "ElementSystem": "Mg",
        "Name": "Magnesium",
        "PropertyEntrySummary": {
            "Elementsystem": "Mg",
            "Elementname": "Magnesium",
            "Atomicnumber": 12,
            "Physicalandchemicalproperties": "Physical properties,Atomic and ionic radii,Electronegativity,\nIonization energy",
            "Crystallographic": "Pearson symbol,Space group,Prototype,Lattice Parameters,",
            "Thermo-Chemicalpropertytables": "Heat capacity,Enthalpy, Entropy, Gibbs free energy,\nEquilibrium constant",
            "Thermo-Chemicalpropertycurves": "Heat capacity,Enthalpy, Entropy, Gibbs free energy"
        },
        "Physicalproperties": {
            "Physicalpropertie": {
                "Atomicnumber": 12,
                "Electronicconfiguration": "[Ne]3s2",
                "Densitygcm": 1.74,
                "Meltingpoint": 650,
                "Boilingpoint": 1110,
                "Thermalconductivity": 156,
                "Electricalresistivity": 4.39
            }
        },
        "AtomicAndIonicRadii": {
            "AtomicAndIonicRadiiElements": {
                "Element": "Mg",
                "Atomradius": 160,
                "Effectiveionicradii-loncharge": "2+",
                "Effectiveionicradii-Coordinator-4": 57,
                "Effectiveionicradii-Coordinator-6": 72,
                "Effectiveionicradii-Coordinator-8": 89,
                "Effectiveionicradii-Coordinator-12": "\\"
            },
            "remark": {
                "remark": "HS and LS are high spin and low spin state respectively."
            }
        },
        "Electronegativity": {
            "ElectronegativityElememts": {
                "Elememt": "Mg",
                "Electronegativity-1-a": 1.2,
                "Electronegativity-1-b": 1.2,
                "Electronegativity-2": 1.23
            },
            "remark": {
                "remark": "I is calculated through the Bond energy, a and b are the calculated values of\nPauling and BauaHOB respectively.\nII is the calculated value through the equation X=0.359*Z'/r+0.744,Z'is the effective nuclear charge number of atom, r is the covalent radius, and X is\nElectronegativity."
            }
        },
        "IonizationEnergy": {
            "IonizationEnergyNumbers": {
                "AtomicNumber": 12,
                "IonizationEnergyRows": {
                    "element": "Mg",
                    "IonizationEnergySpectrums": {
                        "one": 0.738,
                        "two": 1.451,
                        "three": 7.733,
                        "four": 10.54,
                        "five": 13.629,
                        "six": 17.994
                    }
                }
            },
            "reference": "a. James G. Speight. Lange’s Handbook of Chemistry [M ], McGRaw-Hill, 2005\nb．Q. C. Gu, S. C. Lou, Q. P. Dai, et al. Chemical Table s [M], Jingsu Scientific and Te chnical Publishers, 1977."
        },
        "CrystallographicData": {
            "CrystallographicDataElements": {
                "elements": "Mg",
                "CrystallographicDataRows": {
                    "Temperature": 25,
                    "Pressure": "atm",
                    "PearsonSymbol": "hP2",
                    "SpaceGroup": "P6_3/mmc",
                    "Phototype": "Mg",
                    "LatticeParameters_nm": "a=0.32025\nc=0.52000",
                    "Comment": "120^o"
                }
            },
            "reference": "P. Villars, A. Prince, H. Okamoto. Handbook of Ternary alloy Phase Diagrams\n[M], ASM: Materials Park, Ohio, 1995.",
            "remark": {
                "remark": "*Pressures other than atmosphere are given in GPa"
            }
        },
        "Thermo-ChemicalPropertyTables": {
            "Thermo-ChemicalPropertyPhases": [
                {
                    "phase": "SOL",
                    "array":{
                        "Thermo-ChemicalPropertyRows": [
                            {
                                "T": 0,
                                "C_P": 0,
                                "S": 0,
                                "G-H298": "INFINITE",
                                "H-H298": -4.498,
                                "deltaH_f": 0,
                                "deltaG_f": 0,
                                "logK_f": 0
                            },
                            {
                                "T": 100,
                                "C_P": 15.762,
                                "S": 9.505,
                                "G-H298": 53.066,
                                "H-H298": -4.356,
                                "deltaH_f": 0,
                                "deltaG_f": 0,
                                "logK_f": 0
                            }
                        ]
                    }
                },
                {
                    "phase": "Liquid",
                    "array":{
                        "Thermo-ChemicalPropertyRows": [
                            {
                                "T": 1000,
                                "C_P": 34.309,
                                "S": 75.983,
                                "G-H298": 47.113,
                                "H-H298": 28.87,
                                "deltaH_f": 0,
                                "deltaG_f": 0,
                                "logK_f": 0
                            },
                            {
                                "T": 1100,
                                "C_P": 34.309,
                                "S": 79.253,
                                "G-H298": 49.888,
                                "H-H298": 32.301,
                                "deltaH_f": 0,
                                "deltaG_f": 0,
                                "logK_f": 0
                            }
                        ]
                    }
                }
            ],
            "reference": "Malcolm W. Chase, Jr. NIST-JANAF Thermochemical Tables 4th Ed [M], Nation\nInstitute of Standardsand Te chnology: Gaithersburg, M aryland.",
            "remark": {
                "remark": "\\"
            }
        },
        "Thermo-ChemicalPropertyCurves": {
            "Thermo-ChemicalPropertyCurvesElements": {
                "elements": "Mg",
                "array":{
                    "Thermo-ChemicalPropertyCurvesRows": [
                        {
                            "figure": 1,
                            "title": "Heat capacities of phases of Mg",
                            "parameters": "Temperature range:\n300-2000K"
                        },
                        {
                            "figure": 2,
                            "title": "Enthalpies of phases of Mg relative to\nHCP_A3",
                            "parameters": "Temperature range:\n300-2000K"
                        }
                    ]
                }
            },
            "reference": "[1] A. T. Dinsdale. SGTE data for pure e le ments[J]. Calphad,\n1991,15(4):317-425.\n[2] B. Sundman, B. Jansson, J. O. Andersson. The The rmo–Calc databank\nsystem [J]. Calphad, 1985, 9(2): 153-190."
        },
        "Figure": {
            "Figure-file": [
                {
                    "figure-name": "Heat capacities of phases of Mg",
                    "description": "\\",
                    "url": "\\"
                },
                {
                    "figure-name": "\\",
                    "description": "\\",
                    "url": "\\"
                }
            ]
        }
    }
}
